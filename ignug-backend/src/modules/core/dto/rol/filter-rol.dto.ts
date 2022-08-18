import { IsOptional} from 'class-validator';

import { PaginationDto } from '../pagination/pagination.dto';

export class FilterRolDto extends PaginationDto {
  @IsOptional()
  nombre: string;
}
