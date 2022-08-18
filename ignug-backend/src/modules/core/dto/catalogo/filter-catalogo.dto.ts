/* eslint-disable prettier/prettier */
import { IsOptional, MinLength } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterCatalogoDto extends PaginationDto {
  @IsOptional()
  tipoCatalogo: number;

  @IsOptional()
  valor: string;
}
