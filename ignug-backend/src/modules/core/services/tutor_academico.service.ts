import {
  CreateTutorAcademicoDto,
  FilterTutorAcademicoDto,
  PaginationDto,
  UpdateTutorAcademicoDto,
} from '@core/dto';
import { TutorAcademicoEntity } from '../entities/tutor_academico.entity';
import { Inject, Injectable, NotFoundException  } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { TutorAcademicoService } from './tutor_academico.service';


@Injectable()
export class TutorAcademicoService {
  constructor(
    @Inject(RepositoryEnum.TUTOR_ACADEMICO_REPOSITORY)
    private TutorAcademicoRepository: Repository<TutorAcademicoEntity>,
    private TutorAcademicoService: TutorAcademicoService
  ) {}

  async create(
    payload: CreateTutorAcademicoDto,
  ): Promise<ServiceResponseHttpModel> {
    const TutorAcademicoNueva = await this.TutorAcademicoRepository.create(payload);
    TutorAcademicoNueva.persona = await this.TutorAcademicoService.findOne(payload.persona.id);
    const TutorAcademicoCreada = await this.TutorAcademicoRepository.save(TutorAcademicoNueva);
    return { data: TutorAcademicoCreada };
  }

  async findAll(params?: FilterTutorAcademicoDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search

    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.TutorAcademicoRepository.findAndCount({
      relations: ['persona'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const rol = await this.TutorAcademicoRepository.findOne({
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
    payload: UpdateTutorAcademicoDto,
  ): Promise<ServiceResponseHttpModel> {
    const rol = await this.TutorAcademicoRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(`La persona con id:  ${id} no se encontro`);
    }
    TutorAcademico.persona = await this.TutorAcademicoService.findOne(
       payload.persona.id,
     );
    this.TutorAcademicoRepository.merge(rol, payload);
    const TutorAcademicoUpdated = await this.TutorAcademicoRepository.save(rol);
    return { data: TutorAcademicoUpdated };
  }
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.TutorAcademicoRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.TutorAcademicoRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(payload: TutorAcademicoEntity[]): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.TutorAcademicoRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterTutorAcademicoDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<FilterTutorAcademicoDto>
      | FindOptionsWhere<FilterTutorAcademicoDto>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombre: ILike(`%${search}%`) });
    }

    const response = await this.TutorAcademicoRepository.findAndCount({
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