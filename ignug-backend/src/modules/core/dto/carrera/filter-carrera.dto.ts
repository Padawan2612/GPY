/* eslint-disable prettier/prettier */
import { IsOptional} from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterCarreraDto extends PaginationDto {
  @IsOptional()
  nombreCarrera: string;

  @IsOptional()
  descripcion: string; 
}
