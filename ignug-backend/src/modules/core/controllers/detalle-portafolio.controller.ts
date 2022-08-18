/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DetallePortafolioService } from '../services/detalle-portafolio.service';
import { CreateDetallePortafolioDto } from '../dto/detalle-portafolio/create-detalle-portafolio.dto';
import { UpdateDetallePortafolioDto } from '../dto/detalle-portafolio/update-detalle-portafolio.dto';
import { FilterDetallePortafolioDto } from '../dto/detalle-portafolio/filter-detalle-portafolio.dto';
import { DetallePortafolioEntity } from '../entities/detalle-portafolio.entity';

@Controller('detalle-portafolio')
export class DetallePortafolioController {
  constructor(
    private readonly detallePortafolioService: DetallePortafolioService,
  ) {}

  @Post()
  async create(@Body() createDetallePortafolioDto: CreateDetallePortafolioDto) {
    return await this.detallePortafolioService.create(
      createDetallePortafolioDto,
    );
  }

  @Get()
  async findAll(@Query() params: FilterDetallePortafolioDto) {
    return await this.detallePortafolioService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.detallePortafolioService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDetallePortafolioDto: UpdateDetallePortafolioDto,
  ) {
    return await this.detallePortafolioService.update(
      +id,
      updateDetallePortafolioDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.detallePortafolioService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: DetallePortafolioEntity[]) {
    return await this.detallePortafolioService.removeAll(payload);
  }
}
