/* eslint-disable prettier/prettier */
import {  DocumentoEntity} from '@core/entities';
import { IsBoolean, IsNotEmpty, MaxLength} from 'class-validator';

export class CreateDetallePortafolioDto {
  @IsBoolean({
    message: 'el campo estado deber ser booleano',
  })
  estado: boolean;

  @MaxLength(50, {
    message: 'el campo observaciones no deber tener mas de 50 caracteres',
  })
  observaciones: string;

  @IsNotEmpty({ message: "Debe ser objeto de el campo documento'" })
  documento: DocumentoEntity[];
}
