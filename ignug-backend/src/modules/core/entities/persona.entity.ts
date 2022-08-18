/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarreraEntity } from './carrera.entity';
import { RolEntity } from './rol.entity';
import { TutorAcademicoEntity } from './tutor_academico.entity';

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

  @ManyToOne(() => CarreraEntity, (carrera) => carrera.persona)
  carrera: CarreraEntity;

  @ManyToOne(() => CarreraEntity, (tutor) => tutor.persona)
  tutor: TutorAcademicoEntity;

  @ManyToMany(() => RolEntity, (rol) => rol.persona)
  rol: RolEntity[];
}
