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
import { UpdateRolDto, CreateRolDto, FilterRolDto } from '@core/dto';
import { RolEntity } from '../entities/rol.entity';
import { RolService } from '../services/rol.service';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  async create(@Body() createRolDto: CreateRolDto) {
    return await this.rolService.create(createRolDto);
  }

  @Get()
  async findAll(@Query() params: FilterRolDto) {
    return await this.rolService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return await this.rolService.update(+id, updateRolDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: RolEntity[]) {
    return await this.rolService.removeAll(payload);
  }
}
