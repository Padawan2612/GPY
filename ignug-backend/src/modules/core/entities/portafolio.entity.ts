import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoEntity } from './catalogo.entity';

@Entity({ name: 'portafolio' })
export class PortafolioEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  fkEstudiante: number;

  @Column()
  estado: boolean;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.fkPortafolio)
  fkCatalogo: CatalogoEntity;

  @Column()
  fkDistributivoEstudiante: number;
}
