/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query 
} from '@nestjs/common';
import { DocumentoService } from '../services/documento.service';
import { CreateDocumentoDto } from '../dto/documento/create-documento.dto';
import { UpdateDocumentoDto } from '../dto/documento/update-documento.dto';
import { FilterDocumentoDto } from '../dto/documento/filter-documento.dto';
import { DocumentoEntity } from '../entities/documento.entity';


@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  async create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  async findAll(@Query() params: FilterDocumentoDto) {
    return await this.documentoService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return await this.documentoService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.documentoService.remove(+id);
  }

  @Patch('remove-all')
  async removeAll(@Body() payload:DocumentoEntity[]) {
    return await this.documentoService.removeAll(payload)
  }

}
