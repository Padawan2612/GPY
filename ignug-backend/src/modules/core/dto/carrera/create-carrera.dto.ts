/* eslint-disable prettier/prettier */
import { PersonaEntity } from '@core/entities';
import { IsNotEmpty, MinLength } from 'class-validator';


export class CreateCarreraDto {
  @MinLength(10, {
    message: 'El campo carrera minimo debe tenr diez caracteres',
  })
  nombreCarrera: string;

  @MinLength(10, {
    message: 'El campo descripcion minimo debe de tener diez caracteres',
  })
  descripcion: string;

  @IsNotEmpty({ message: "Debe ser objeto de el campo persona'" })
  persona: PersonaEntity[];
}
