/* eslint-disable prettier/prettier */
import { PortafolioEntity } from '@core/entities';
import { IsNotEmpty, MinLength, Min } from 'class-validator';

export class CreateCatalogoDto {
  @Min(1, {
    message: 'El campo catalgo minimo debe tenr diez caracteres',
  })
  tipoCatalogo: number;

  @MinLength(10, {
    message: 'El campo valor minimo debe de tener diez caracteres',
  })
  valor: string;

  @IsNotEmpty({ message: "Debe ser objeto de el campo portafolio'" })
  portafolio: PortafolioEntity[];
}
