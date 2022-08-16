import { CarreraEntity } from '@core/entities';
import { IsBoolean, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreatePersonaDto {
  @Min(1, { message: 'El campo cedula debe tener diez caracteres' })
  cedula: number;

  @MinLength(10, {
    message: 'El campo nombre debe tener minimo cinco caracteres',
  })
  nombre: string;
  @MinLength(10, {
    message: 'El campo apellido debe tener minimo cinco caracteres',
  })
  apellido: string;
  @MinLength(10, {
    message: 'El campo contraseña debe tener minimo ocho caracteres',
  })
  password: string;
  @IsBoolean({
    message: 'El campo estado debe ser booleano',
  })
  estado: boolean;

  @Min(10, { message: 'El campo telefono debe tener diez caracteres' })
  telefono: number;

  @IsNotEmpty({ message: 'Debe ser objeto del campo carrera' })
  carrera: CarreraEntity;
}
