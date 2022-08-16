import { CreateCarreraDto, FilterCarreraDto, UpdateCarreraDto } from '@core/dto';
import { CarreraService } from '@core/services';
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
import { CarreraEntity } from '../entities/carrera.entity';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post()
  async create(@Body() createCarreraDto: CreateCarreraDto) {
    return await this.carreraService.create(createCarreraDto);
  }

  @Get()
  async findAll(@Query() params: FilterCarreraDto) {
    return await this.carreraService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carreraService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarreraDto: UpdateCarreraDto,
  ) {
    return await this.carreraService.update(+id, updateCarreraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.carreraService.remove(id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: CarreraEntity[]) {
    return await this.carreraService.removeAll(payload);
  }
}
