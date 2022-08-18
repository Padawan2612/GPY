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
import { PersonaService } from '@core/services';

import {
  UpdatePersonaDto,
  CreatePersonaDto,
  FilterPersonaDto,
} from '@core/dto';
import { PersonaEntity } from '@core/entities';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personaService.create(createPersonaDto);
  }

  @Get()
  async findAll(@Query() params: FilterPersonaDto) {
    return await this.personaService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return await this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.personaService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: PersonaEntity[]) {
    return await this.personaService.removeAll(payload);
  }
}
