import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';

@Entity({ name: 'tutoracademico' })
export class TutorAcademicoEntity{
  @PrimaryGeneratedColumn({})
  id: number;
  
  @Column()
  titulo: string;

  @Column()
  especialidad: string;

  @Column()
  direccion: string;

<<<<<<< HEAD
  @ManyToOne(() => PersonaEntity, (persona) => persona.tutor)
=======
 // @ManyToOne(() => PersonaEntity, (persona) => persona.tutoracademico)
>>>>>>> 3e8ba1ad4733fd4e0aff938e3ee37fa7f71678f5
  persona: PersonaEntity;
}



 
