import { IsOptional, MinLength } from 'class-validator';

import { PaginationDto } from '../pagination/pagination.dto';

export class FilterTutorAcademicoDto extends PaginationDto {
  @IsOptional()
  titulo: string;

  @IsOptional()
  especialidad: string;

}
