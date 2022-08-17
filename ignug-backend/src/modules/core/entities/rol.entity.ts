import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    persona: PersonaEntity; 
}
