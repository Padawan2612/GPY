import { Injectable } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import { CreateCatalogueDto } from '@core/dto';

@Injectable()
export class CataloguesSeeder {
  constructor(private catalogueService: CataloguesService) { }

  run() {
   
  }

}