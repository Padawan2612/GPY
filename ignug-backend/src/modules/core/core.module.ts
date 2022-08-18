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
  CatalogoService,
  CataloguesService,
  DetallePortafolioService,
  DocumentoService,
  PersonaService,
  PortafolioService,
  RolService,
  TutorAcademicoService,
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
    CatalogoController,
    DetallePortafolioController,
    PortafolioController,
    RolController,
  ],

  providers: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService,
    DocumentoService,
    CatalogoService,
    DetallePortafolioService,
    PortafolioService,
    RolService,
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    CarreraService,
    PersonaService,
    RolService,
    DocumentoService,
    CatalogoService,
    DetallePortafolioService,
    PortafolioService,
    RolService,
  ],
})
export class CoreModule {}
