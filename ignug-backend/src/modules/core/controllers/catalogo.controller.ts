/* eslint-disable prettier/prettier */
import {
  CreateCatalogoDto,
  FilterCatalogoDto,
  UpdateCatalogoDto,
} from '@core/dto';
import { CatalogoService } from '@core/services';
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
import { CatalogoEntity } from '../entities/catalogo.entity';

@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Post()
  async create(@Body() createCatalogoDto: CreateCatalogoDto) {
    return await this.catalogoService.create(createCatalogoDto);
  }

  @Get()
  async findAll(@Query() params: FilterCatalogoDto) {
    return await this.catalogoService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catalogoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatalogoDto: UpdateCatalogoDto,
  ) {
    return await this.catalogoService.update(+id, updateCatalogoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.catalogoService.remove(id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: CatalogoEntity[]) {
    return await this.catalogoService.removeAll(payload);
  }
}
