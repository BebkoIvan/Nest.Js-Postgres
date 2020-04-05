import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn} from 'typeorm'
import { UserEntity } from 'src/user/user.entity';

@Entity()
export class IdeaEntity {
    @PrimaryGeneratedColumn()
     id: number;
    
    @CreateDateColumn()
     created: Date; 
    
    @UpdateDateColumn()
     updated: Date;

    @Column('text')
     idea: string;
    
     @Column('text')
     description: string;

     @ManyToOne(type => UserEntity, author => author.ideas)
     author: UserEntity

}