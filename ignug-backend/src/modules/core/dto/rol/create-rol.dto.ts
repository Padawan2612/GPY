/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, MinLength } from 'class-validator';
import { PersonaEntity } from '../../entities/persona.entity';

export class CreateRolDto {
  @MinLength(10, {
    message: 'El campo nombre debe tener minimo cinco caracteres',
  })
  nombre: string;

  @IsBoolean({
    message: 'El campo estado debe ser booleano',
  })
  estado: boolean;

  @IsNotEmpty({ message: 'Debe ser objeto del campo persona' })
  persona: PersonaEntity[];
}
