/* eslint-disable prettier/prettier */
import { IsOptional, MinLength } from 'class-validator';

import { PaginationDto } from '../pagination/pagination.dto';

export class FilterPersonaDto extends PaginationDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  apellido: string;

  @IsOptional()
  password: string;
}
