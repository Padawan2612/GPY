/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DetallePortafolioEntity} from './detalle-portafolio.entity'

@Entity({ name: 'documento' })
export class DocumentoEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ name: 'nombre_documento' })
  nombreDocumento: string;

  @Column({name: 'numero_plantilla'})
  plantilla: number;

  @Column()
  estado: boolean;  

  @ManyToOne(() => DetallePortafolioEntity, (detalle_portafolio) => detalle_portafolio.documento)
  detalle_portafolio: DetallePortafolioEntity;
}