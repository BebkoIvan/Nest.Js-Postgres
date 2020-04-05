import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from '../idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from 'src/user/user.entity';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class IdeaService {
	constructor(
		@InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
     private userRepository: Repository<UserEntity>
  ) {}

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    return {...idea, author: idea.author.toResponseObject() };
  }

  private isIdeaOwner(idea, userId) {
    if(idea.author.id !== userId) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  
  async getAllIdeas(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({ relations: ['author']});
    return ideas.map(idea =>  this.toResponseObject(idea));
  }

  async createIdea(userId: number, data: IdeaDTO): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    const idea = this.ideaRepository.create({...data, author: user});
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea); 
  } 

  async readOneIdea(id: number):Promise<IdeaRO> {
    const idea =  await this.ideaRepository.findOne({where: {id}, relations: ['author']});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.toResponseObject(idea);
  }

  async updateIdea(id: number, userId: number, data: Partial<IdeaDTO>) {
    const idea = await this.ideaRepository.findOne({where: {id}, relations: ['author']});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    this.isIdeaOwner(idea, userId);
    await this.ideaRepository.update({id}, data);
    return this.toResponseObject(await this.ideaRepository.findOne({where: {id}}));
  }

  async deleteIdea(id: number, userId: number) {
    const idea = await this.ideaRepository.findOne({where: {id}, relations: ['author']});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    this.isIdeaOwner(idea, userId);
    await this.ideaRepository.delete({id});
    return {deleted: true};
  }
}
