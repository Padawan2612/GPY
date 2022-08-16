import { MinLength } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterCarreraDto extends PaginationDto {
  @MinLength(1, { message: 'El campo carrera debe tener minimo un caracter' })
  nombreCarrera: string;

  @MinLength(10, { message: 'El campo descripcion debe tener minimo diez caracteres' })
  descripcion: string;
}
