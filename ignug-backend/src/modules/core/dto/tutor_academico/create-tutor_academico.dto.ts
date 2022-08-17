import { IsBoolean, IsNotEmpty, MinLength } from 'class-validator';
import { TutorAcademicoEntity } from '../../entities/tutor_academico.entity';

export class CreateTutorAcademicoDto {
@Min(1, { message: 'El campo cedula debe tener diez caracteres' })
  id: number;

  @MinLength(10, {
    message: 'El campo nombre debe tener minimo cinco caracteres',
  })
  titulo: string;
  @MinLength(10, {
    message: 'El campo titulo debe tener minimo dies caracteres',
  })
  especialidad: string;
  @MinLength(10, {
    message: 'El campo direccion debe tener minimo doce caracteres',
  })
  direccion: string;
  

  @IsNotEmpty({ message: 'Debe ser objeto del campo carrera' })
  carrera: TutorAcademicoEntity;
}

