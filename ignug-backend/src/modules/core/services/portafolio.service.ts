import {
  CreatePortafolioDto,
  FilterPortafolioDto,
  PaginationDto,
  UpdatePortafolioDto,
} from '@core/dto';
import { PortafolioEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CatalogoService } from '@core/services';

@Injectable()
export class PortafolioService {
  constructor(
    @Inject(RepositoryEnum.PORTAFOLIO_REPOSITORY)
    private portafolioRepository: Repository<PortafolioEntity>,
    private catalogoService: CatalogoService,
  ) {}

  async create(
    payload: CreatePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    const portafolioNueva = await this.portafolioRepository.create(payload);
    portafolioNueva.fkCatalogo = await this.catalogoService.findOne(
      payload.fkCatalogo.id,
    );
    const portafolioCreada = await this.portafolioRepository.save(
      portafolioNueva,
    );
    return { data: portafolioCreada };
  }

  async findAll(
    params?: FilterPortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search

    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.portafolioRepository.findAndCount({
      relations: ['catalogo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const portafolio = await this.portafolioRepository.findOne({
      relations: ['catalogo'],
      where: {
        id,
      },
    });

    if (!portafolio) {
      throw new NotFoundException(
        `El portafolio con id:  ${id} no se encontro`,
      );
    }
    return { data: portafolio };
  }

  async update(
    id: number,
    payload: UpdatePortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    const portafolio = await this.portafolioRepository.findOneBy({ id });
    if (!portafolio) {
      throw new NotFoundException(`La catalogo con id:  ${id} no se encontro`);
    }
    portafolio.fkCatalogo = await this.catalogoService.findOne(
      payload.fkCatalogo.id,
    );
    this.portafolioRepository.merge(portafolio, payload);
    const portafolioUpdated = await this.portafolioRepository.save(portafolio);
    return { data: portafolioUpdated };
  }
  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.portafolioRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.portafolioRepository.softDelete(id);
    return { data: institutionDeleted };
  }
  async removeAll(
    payload: PortafolioEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.portafolioRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterPortafolioDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<FilterPortafolioDto>
      | FindOptionsWhere<FilterPortafolioDto>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
    }

    const response = await this.portafolioRepository.findAndCount({
      relations: ['catalogo'],
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
