import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarreraEntity } from './carrera.entity';

@Entity({ name: 'persona' })
export class PersonaEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column()
  estado: boolean;

  @Column()
  telefono: number;

  @ManyToOne(() => CarreraEntity, (carrera) => carrera.fk_persona)
  fk_carrera: CarreraEntity;
}
