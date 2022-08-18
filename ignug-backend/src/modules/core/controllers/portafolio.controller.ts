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
import { PortafolioService } from '@core/services';

import {
  UpdatePortafolioDto,
  CreatePortafolioDto,
  FilterPortafolioDto,
} from '@core/dto';
import { PortafolioEntity } from '@core/entities';

@Controller('portafolio')
export class PortafolioController {
  constructor(private readonly portafolioService: PortafolioService) {}

  @Post()
  async create(@Body() createPortafolioDto: CreatePortafolioDto) {
    return await this.portafolioService.create(createPortafolioDto);
  }

  @Get()
  async findAll(@Query() params: FilterPortafolioDto) {
    return await this.portafolioService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.portafolioService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortafolioDto: UpdatePortafolioDto,
  ) {
    return await this.portafolioService.update(+id, updatePortafolioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.portafolioService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload: PortafolioEntity[]) {
    return await this.portafolioService.removeAll(payload);
  }
}
