/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import {
  CarreraController,
  CataloguesController,
  PersonaController,
  RolController,
} from '@core/controllers';
import {
  CarreraService,
  CataloguesService,
  PersonaService,
  RolService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule,],
  controllers: [CataloguesController, CarreraController, PersonaController],

  providers: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService
  ],
})
export class CoreModule {}
