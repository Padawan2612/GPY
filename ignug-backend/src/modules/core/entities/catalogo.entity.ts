/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PortafolioEntity } from './portafolio.entity';

@Entity({ name: 'catalogo' })
export class CatalogoEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  tipoCatalogo: number;

  @Column()
  valor: string;

  @ManyToOne(() => PortafolioEntity, (portafolio) => portafolio.fkCatalogo)
  fkPortafolio: PortafolioEntity[];
}
