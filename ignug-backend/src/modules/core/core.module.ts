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
import { TutorAcadenicoModule } from './tutor_acadenico/tutor_acadenico.module';
import { TutorAcademicoModule } from './tutor_academico/tutor_academico.module';

@Global()
@Module({
  imports: [DatabaseModule, TutorAcadenicoModule, TutorAcademicoModule],
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
