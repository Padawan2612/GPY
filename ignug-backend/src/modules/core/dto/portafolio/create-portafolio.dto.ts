import { CatalogoEntity } from '@core/entities';
import { IsBoolean, IsNotEmpty, Min } from 'class-validator';

export class CreatePortafolioDto {
  @Min(1, { message: 'El campo cedula debe tener diez caracteres' })
  fkEstudiante: number;

  @IsBoolean({
    message: 'El campo estado debe ser booleano',
  })
  estado: boolean;

  @Min(10, { message: 'El campo  tener diez caracteres' })
  fkDistributivoEstudiante: number;

  @IsNotEmpty({ message: 'Debe ser objeto del campo catalogo' })
  fkCatalogo: CatalogoEntity;
}
