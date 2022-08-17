/* eslint-disable prettier/prettier */
import { IsOptional} from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterDocumentoDto extends PaginationDto {
    @IsOptional()
    nombreDocumento: string;

    @IsOptional()
    plantilla: number;

    @IsOptional()
    estado: boolean;
}
