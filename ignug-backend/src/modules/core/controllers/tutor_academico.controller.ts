import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UpdateTutorAcademicoDto, CreateTutorAcademicoDto, FilterTutorAcademicoDto } from '@core/dto';
import { TutorAcademicoEntity } from '../entities/tutor_academico.entity';
import { TutorAcademicoService } from '../services/tutor_academico.service';

@Controller('rol')
export class TutorAcademicoController {
  constructor(private readonly TutorAcademicoService: TutorAcademicoService) {}

  @Post()
  async create(@Body() createTutorAcademicoDto: CreateTutorAcademicoDto) {
    return await this.TutorAcademicoService.create(createTutorAcademicoDto);
  }

  @Get()
  async findAll(@Query() params:FilterTutorAcademicoDto) {
    return await this.TutorAcademicoService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.TutorAcademicoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTutorAcademicoDto: UpdateTutorAcademicoDto,
  ) {
    return await this.TutorAcademicoService.update(+id, updateTutorAcademicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.TutorAcademicoService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: TutorAcademicoEntity[]) {
    return await this.TutorAcademicoService.removeAll(payload);
  }
}