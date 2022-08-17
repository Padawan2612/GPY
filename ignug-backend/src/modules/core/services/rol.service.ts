import {
  CreateRolDto,
  FilterRolDto,
  PaginationDto,
  UpdateRolDto,
} from '@core/dto';
import { RolEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException  } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PersonaService } from '@core/services';


@Injectable()
export class RolService {
  constructor(
    @Inject(RepositoryEnum.ROL_REPOSITORY)
    private rolRepository: Repository<RolEntity>,
    private personaService: PersonaService
  ) {}

  async create(
    payload: CreateRolDto,
  ): Promise<ServiceResponseHttpModel> {
    const rolNueva = await this.rolRepository.create(payload);
    rolNueva.persona = await this.personaService.findOne(payload.persona.id);
    const rolCreada = await this.rolRepository.save(rolNueva);
    return { data: rolCreada };
  }

  async findAll(params?: FilterRolDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.rolRepository.findAndCount({
      relations: ['persona'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const rol = await this.rolRepository.findOne({
      relations: ['persona'],
      where: {
        id,
      },
    });

    if (!rol) {
      throw new NotFoundException(`El rol con id:  ${id} no se encontro`);
    }
    return { data: rol };
  }

  async update(
    id: number,
    payload: UpdateRolDto,
  ): Promise<ServiceResponseHttpModel> {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(`La persona con id:  ${id} no se encontro`);
    }
     rol.persona = await this.personaService.findOne(
       payload.persona.id,
     );
    this.rolRepository.merge(rol, payload);
    const rolUpdated = await this.rolRepository.save(rol);
    return { data: rolUpdated };
  }
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.rolRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.rolRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(payload: RolEntity[]): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.rolRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRolDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<FilterRolDto>
      | FindOptionsWhere<FilterRolDto>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombre: ILike(`%${search}%`) });
    }

    const response = await this.rolRepository.findAndCount({
      relations: ['persona'],
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
