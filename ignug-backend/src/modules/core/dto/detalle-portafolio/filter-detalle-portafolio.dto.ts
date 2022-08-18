/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterDetallePortafolioDto extends PaginationDto {
  @IsOptional()
  estado: boolean;

  @IsOptional()
  observaciones: string;
}
