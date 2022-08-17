import { Global, Module } from '@nestjs/common';
import {
  CarreraController,
  CataloguesController,
  PersonaController,
} from '@core/controllers';
import {
  CarreraService,
  CataloguesService,
  PersonaService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';
import { RolNoSpecModule } from './rol--no-spec/rol--no-spec.module';
import { RolModule } from './rol/rol.module';


@Global()
@Module({
  imports: [DatabaseModule, RolNoSpecModule, RolModule],
  controllers: [CataloguesController, CarreraController, PersonaController],
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
