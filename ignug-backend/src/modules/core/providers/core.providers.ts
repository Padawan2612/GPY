/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CatalogoEntity, CatalogueEntity, DetallePortafolioEntity, PortafolioEntity, RolEntity, TutorAcademicoEntity } from '@core/entities';
import { CarreraEntity, PersonaEntity, DocumentoEntity  } from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

export const coreProviders = [
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CARRERA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CarreraEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.PERSONA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PersonaEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ROL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RolEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.DOCUMENTO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DocumentoEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.CATALOGO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogoEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.DETALLE_PORTAFOLIO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DetallePortafolioEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.PORTAFOLIO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PortafolioEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.TUTOR_ACADEMICO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TutorAcademicoEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
