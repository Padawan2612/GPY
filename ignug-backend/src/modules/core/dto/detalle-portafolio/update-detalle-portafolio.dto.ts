/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateDetallePortafolioDto } from './create-detalle-portafolio.dto';

export class UpdateDetallePortafolioDto extends PartialType(CreateDetallePortafolioDto) {}
