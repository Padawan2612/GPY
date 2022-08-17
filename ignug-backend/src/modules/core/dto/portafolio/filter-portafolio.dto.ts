import { IsOptional, MinLength } from 'class-validator';

import { PaginationDto } from '../pagination/pagination.dto';

export class FilterPortafolioDto extends PaginationDto {
  @IsOptional()
  fkEstudiante: number;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  fkDistributivoEstudiante: number;
}
