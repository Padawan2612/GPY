/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonaEntity } from './persona.entity';

@Entity({ name: 'rol' })
export class RolEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  nombre: string;

  @Column()
  estado: boolean;

  @ManyToMany(() => PersonaEntity, (persona) => persona.rol)
  @JoinTable({
    name: 'persona_rol',
    joinColumn: {
      name: 'rol_id',
    },
    inverseJoinColumn: {
      name: 'persona_id',
    },
  })
  persona: PersonaEntity[];
}
