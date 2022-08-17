/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentoEntity } from './documento.entity';

@Entity({ name: 'detalle_portafolio' })
export class DetallePortafolioEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({name: 'estado del portafolio'})
  estado: boolean;  

  @Column({name: 'Observaciones_portafolio'})
  observaciones: string;

  

  @OneToMany(() => DocumentoEntity, (documento) => documento.detalle_portafolio)
  documento: DocumentoEntity[];
}
