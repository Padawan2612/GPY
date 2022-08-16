import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';

@Entity({ name: 'carrera' })
export class CarreraEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ name: 'nombre_carrera' })
  nombreCarrera: string;

  @Column()
  descripcion: string;

  @OneToMany(() => PersonaEntity, (persona) => persona.carrera)
  persona: PersonaEntity[];
}
