/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateDetallePortafolioDto } from '../dto/detalle-portafolio/create-detalle-portafolio.dto';
import { FilterDetallePortafolioDto } from '../dto/detalle-portafolio/filter-detalle-portafolio.dto';
import { UpdateDetallePortafolioDto } from '../dto/detalle-portafolio/update-detalle-portafolio.dto';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { DetallePortafolioEntity } from '../entities/detalle-portafolio.entity';

@Injectable()
export class DetallePortafolioService {
  constructor(
    @Inject(RepositoryEnum.DETALLE_PORTAFOLIO_REPOSITORY)
    private detallePortafolioRepository: Repository<DetallePortafolioEntity>,
  ) {}

  async create(
    payload: CreateDetallePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    const detallePortafolioNueva =
      await this.detallePortafolioRepository.create(payload);

    const detallePortafolioCreada = await this.detallePortafolioRepository.save(
      detallePortafolioNueva,
    );

    return { data: detallePortafolioCreada };
  }

  async findAll(
    params?: FilterDetallePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.detallePortafolioRepository.findAndCount({
      relations: ['documento'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  private async paginateAndFilter(
    params: FilterDetallePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DetallePortafolioEntity>
      | FindOptionsWhere<DetallePortafolioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ observaciones: ILike(`%${search}%`) });
    }

    const response = await this.detallePortafolioRepository.findAndCount({
      relations: ['documento'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }

  async findOne(id: number): Promise<any> {
    const detalPortafolio = await this.detallePortafolioRepository.findOne({
      relations: ['documento'],
      where: {
        id,
      },
    });

    if (!detalPortafolio) {
      throw new NotFoundException(
        `el detalle portafolio con el id: ${id} no se encontro`,
      );
    }

    return { data: detalPortafolio };
  }

  async update(
    id: number,
    payload: UpdateDetallePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    const detalPortafolio = await this.detallePortafolioRepository.findOneBy({
      id,
    });

    if (!detalPortafolio) {
      throw new NotFoundException(
        `el detalle portafolio con el id: ${id} no se encontro`,
      );
    }

    this.detallePortafolioRepository.merge(detalPortafolio, payload);
    const detalPortafolioUpdated = await this.detallePortafolioRepository.save(
      detalPortafolio,
    );

    return { data: detalPortafolioUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const portafolio = await this.detallePortafolioRepository.findOneBy({ id });

    if (!portafolio)
      throw new NotFoundException('detalle del portafolio no encontrado');

    const portafolioDeleted = await this.detallePortafolioRepository.softDelete(
      id,
    );

    return { data: portafolioDeleted };
  }

  async removeAll(
    payload: DetallePortafolioEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const portafoliosDeleted =
      await this.detallePortafolioRepository.softRemove(payload);
    return { data: portafoliosDeleted };
  }
}
