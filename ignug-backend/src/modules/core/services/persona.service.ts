/* eslint-disable prettier/prettier */
import {
  CreatePersonaDto,
  FilterPersonaDto,
  PaginationDto,
  UpdatePersonaDto,
} from '@core/dto';
import { PersonaEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CarreraService } from '@core/services';

@Injectable()
export class PersonaService {
  constructor(
    @Inject(RepositoryEnum.PERSONA_REPOSITORY)
    private personaRepository: Repository<PersonaEntity>, 
    private carreraService: CarreraService
  ) {}

  async create(
    payload: CreatePersonaDto,
  ): Promise<ServiceResponseHttpModel> {
    const personaNueva = await this.personaRepository.create(payload);
    personaNueva.carrera = await this.carreraService.findOne(payload.carrera.id);
    const personaCreada = await this.personaRepository.save(personaNueva);
    return { data: personaCreada };
  }

  async findAll(params?: FilterPersonaDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.personaRepository.findAndCount({
      relations: ['carrera'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const persona = await this.personaRepository.findOne({
      relations: ['carrera'],
      where: {
        id,
      },
    });

    if (!persona) {
      throw new NotFoundException(`La persona con id:  ${id} no se encontro`);
    }
    return { data: persona };
  }

  async update(
    id: number,
    payload: UpdatePersonaDto,
  ): Promise<ServiceResponseHttpModel> {
    const persona = await this.personaRepository.findOneBy({ id });
    if (!persona) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
     persona.carrera = await this.carreraService.findOne(
       payload.carrera.id,
     );
    this.personaRepository.merge(persona, payload);
    const personaUpdated = await this.personaRepository.save(persona);
    return { data: personaUpdated };
  }
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.personaRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.personaRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(payload: PersonaEntity[]): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.personaRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterPersonaDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<FilterPersonaDto>
      | FindOptionsWhere<FilterPersonaDto>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombre: ILike(`%${search}%`) });
      where.push({ apellido: ILike(`%${search}%`) });
      where.push({ password: ILike(`%${search}%`) });
    }

    const response = await this.personaRepository.findAndCount({
      relations: ['carrera'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
