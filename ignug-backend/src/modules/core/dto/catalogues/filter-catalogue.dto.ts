import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterCatalogueDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
