import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany} from 'typeorm'
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
     id: number;
    
    @CreateDateColumn()
     created: Date; 
    
    @Column({
        type: 'text',
        unique: true
    })
     username: string;
    
     @Column('text')
     password: string;

     @OneToMany(type => IdeaEntity, idea => idea.author)
     ideas: IdeaEntity[];

     @BeforeInsert()
     async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
     }

     toResponseObject(showToken = false): UserRO {
        const {id, created, username, token} = this;
        const responseObj: any = {id, created, username};
         if(showToken) responseObj.token = token;
         return responseObj;
     }

     async comparePassword(attempt: string) {
         return await bcrypt.compare(attempt, this.password);
     }

     private get token() {
         const {id, username} = this;
         return jwt.sign({id, username},process.env.SECRET, {expiresIn: '7d'});
     }



}