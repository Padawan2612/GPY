/* eslint-disable prettier/prettier */
import { DetallePortafolioEntity } from '@core/entities';
import { IsBoolean, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateDocumentoDto {
    @MinLength(10, {
      message: 'el campo nombre deber tener al menos 10 caracteres',
    })
    nombreDocumento: string;
    
    @Min(10, {
      message: 'El campo plantilla debe ser almenos de de 10 digitos',
    })
    plantilla: number;

    @IsBoolean({
        message: 'el campo estado deber ser booleano'
    })
    estado: boolean;
    
    @IsNotEmpty({ message: "Debe ser objeto de el campo Detalle portafolio'" })
    detalle_portafolio: DetallePortafolioEntity;
}
