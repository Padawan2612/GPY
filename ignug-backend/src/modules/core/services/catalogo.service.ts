/* eslint-disable prettier/prettier */
import {
  CreateCatalogoDto,
  FilterCatalogoDto,
  PaginationDto,
  UpdateCatalogoDto,
} from '@core/dto';
import { CatalogoEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class CatalogoService {
  constructor(
    @Inject(RepositoryEnum.CATALOGO_REPOSITORY)
    private catalogoRepository: Repository<CatalogoEntity>,
  ) {}

  async create(payload: CreateCatalogoDto): Promise<ServiceResponseHttpModel> {
    const catalogoNueva = await this.catalogoRepository.create(payload);

    const catalogoCreada = await this.catalogoRepository.save(catalogoNueva);

    return { data: catalogoCreada };
  }

  async findAll(params?: FilterCatalogoDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.catalogoRepository.findAndCount({
      relations: ['portafolio'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const career = await this.catalogoRepository.findOne({
      relations: ['portafolio'],
      where: {
        id,
      },
    });

    if (!career) {
      throw new NotFoundException(`La catalogo con id:  ${id} no se encontro`);
    }
    throw new NotFoundException(`La catalogo con id:  ${id} no se encontro`);
  }

  async update(
    id: number,
    payload: UpdateCatalogoDto,
  ): Promise<ServiceResponseHttpModel> {
    const career = await this.catalogoRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`La catalogo con id:  ${id} no se encontro`);
    }
    this.catalogoRepository.merge(career, payload);
    const careerUpdated = await this.catalogoRepository.save(career);
    return { data: careerUpdated };
  }
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.catalogoRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.catalogoRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(
    payload: CatalogoEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.catalogoRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterCatalogoDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CatalogoEntity>
      | FindOptionsWhere<CatalogoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ valor: ILike(`%${search}%`) });
    }

    const response = await this.catalogoRepository.findAndCount({
      relations: ['portafolio'],
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
