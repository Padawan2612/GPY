/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateDocumentoDto } from '../dto/documento/create-documento.dto';
import { FilterDocumentoDto } from '../dto/documento/filter-documento.dto';
import { UpdateDocumentoDto } from '../dto/documento/update-documento.dto';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { DocumentoEntity } from '../entities/documento.entity';

@Injectable()
export class DocumentoService {
  constructor(
    @Inject(RepositoryEnum.DOCUMENTO_REPOSITORY)
    private documentoRepository: Repository<DocumentoEntity>,
  ) {}

  async create(payload: CreateDocumentoDto): Promise<ServiceResponseHttpModel> {
    const documentoNueva = await this.documentoRepository.create(payload);

    const documentoCreada = await this.documentoRepository.save(documentoNueva);

    return { data: documentoCreada };
  }

  async findAll(
    params?: FilterDocumentoDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const data = await this.documentoRepository.findAndCount({
      relations: ['detalle-portafolio'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  private async paginateAndFilter(
    params: FilterDocumentoDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DocumentoEntity>
      | FindOptionsWhere<DocumentoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nombreDocumento: ILike(`%${search}%`) });
    }

    const response = await this.documentoRepository.findAndCount({
      relations: ['detalle-portafolio'],
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
    const documento = await this.documentoRepository.findOne({
      relations: ['detalle-portafolio'],
      where: {
        id,
      },
    });

    if (!documento) {
      throw new NotFoundException(
        `el documento con el id: ${id} no se encontro`,
      );
    }

    return { data: documento };
  }



  async update(id: number, payload: UpdateDocumentoDto,
    ): Promise<ServiceResponseHttpModel> {
      const documento= await this.documentoRepository.findOneBy({
        id
      });
  
      if (!documento) {
        throw new NotFoundException(`el detalle documento con el id: ${id} no se encontro`)
      }
  
      this.documentoRepository.merge(documento, payload);
      const documentoUpdated = await this.documentoRepository.save(documento);
  
      return { data: documentoUpdated}
    }

    async remove(id: number):
  Promise<ServiceResponseHttpModel> {
    const documento = await this.documentoRepository.findOneBy({id});

    if (!documento) throw new NotFoundException(' documento no encontrado');

    const documentoDeleted = await this.documentoRepository.softDelete(id);

    return { data: documentoDeleted};
  }

  async removeAll(payload: DocumentoEntity[]):Promise<ServiceResponseHttpModel> {
    const documentoDeleted = await this.documentoRepository.softRemove(
      payload,
    );
    return { data: documentoDeleted}
  }
}
