/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import {
  CarreraController,
  CatalogoController,
  CataloguesController,
  DetallePortafolioController,
  DocumentoController,
  PersonaController,
  PortafolioController,
  RolController,
  TutorAcademicoController,
} from '@core/controllers';
import {
  CarreraService,
  CataloguesService,
  DocumentoService,
  PersonaService,
  RolService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CataloguesController,
    CarreraController,
    PersonaController,
    DocumentoController,
  ],

  providers: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService,
    DocumentoService,
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService,
    DocumentoService,
  ],
})
export class CoreModule {}
