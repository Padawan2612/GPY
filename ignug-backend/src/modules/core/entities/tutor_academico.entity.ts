import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';

@Entity({ name: 'tutoracademico' })
export class TutorAcademicoEntity{}
@PrimaryGeneratedColumn({})
  id: number;


  @Column()
  titulo: string;

  @Column()
  especialidad: string;

  @Column()
  direccion: string;

  @ManyToOne(() => PersonaEntity, (persona) => persona.tutoracademico)
  persona: PersonaEntity;
}