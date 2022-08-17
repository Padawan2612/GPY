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
import { TutorAcadenicoModule } from './tutor_acadenico/tutor_acadenico.module';
import { TutorAcademicoModule } from './tutor_academico/tutor_academico.module';

@Global()
@Module({
<<<<<<< HEAD
  imports: [DatabaseModule, TutorAcadenicoModule, TutorAcademicoModule],
  controllers: [CataloguesController, CarreraController, PersonaController],
=======
  imports: [DatabaseModule,],
  controllers: [CataloguesController, CarreraController, PersonaController, RolController],
 

>>>>>>> f7a5ef9cbe7654ec7e100a491dea60cbbe2a7d39
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
