/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CatalogueEntity, RolEntity } from '@core/entities';
import { CarreraEntity, PersonaEntity } from '@core/entities';
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
];
