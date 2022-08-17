/* eslint-disable prettier/prettier */
import {
  CreateCarreraDto,
  FilterCarreraDto,
  PaginationDto,
  UpdateCarreraDto,
} from '@core/dto';
import { CarreraEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class CarreraService {
  constructor(
    @Inject(RepositoryEnum.CARRERA_REPOSITORY)
    private carreraRepository: Repository<CarreraEntity>,
   
  ) {}

  async create(payload: CreateCarreraDto): Promise<ServiceResponseHttpModel> {
    const carreraNueva = await this.carreraRepository.create(payload);

    const carreraCreada = await this.carreraRepository.save(carreraNueva);

    return { data: carreraCreada };
  }

  async findAll(params?: FilterCarreraDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.carreraRepository.findAndCount({
      relations: ['persona'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const career = await this.carreraRepository.findOne({
      relations: ['persona'],
      where: {
        id,
      },
    });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    return { data: career };
  }

  async update(
    id: number,
    payload: UpdateCarreraDto,
  ): Promise<ServiceResponseHttpModel> {
    const career = await this.carreraRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.carreraRepository.merge(career, payload);
    const careerUpdated = await this.carreraRepository.save(career);
    return { data: careerUpdated };
  }

  
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.carreraRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.carreraRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(payload: CarreraEntity[]): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.carreraRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterCarreraDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CarreraEntity>
      | FindOptionsWhere<CarreraEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreCarrera: ILike(`%${search}%`) });
      where.push({ descripcion: ILike(`%${search}%`) });
    }

    const response = await this.carreraRepository.findAndCount({
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
