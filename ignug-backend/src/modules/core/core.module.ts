/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import {
  CarreraController,
  CataloguesController,
  PersonaController,
  DocumentoController
} from '@core/controllers';
import {
  CarreraService,
  CataloguesService,
  DocumentoService,
  PersonaService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [CataloguesController, CarreraController, PersonaController, ],
  providers: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
  ],
})
export class CoreModule {}
