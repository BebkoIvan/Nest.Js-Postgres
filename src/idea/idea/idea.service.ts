import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from '../idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
	constructor(
		@InjectRepository(IdeaEntity)
		private ideaRepository: Repository<IdeaEntity>,
  ) {}
  
  async getAllIdeas() {
    return  await this.ideaRepository.find();
  }

  async createIdea(data: IdeaDTO) {
    const idea = this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea; 
  } 

  async readOneIdea(id: string) {
    const idea =  await this.ideaRepository.findOne({where: {id}});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return idea;
  }

  async updateIdea(id: string, data: Partial<IdeaDTO>) {
    const idea = await this.ideaRepository.findOne({where: {id}});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.ideaRepository.update({id}, data);
    return await this.ideaRepository.findOne({where: {id}});
  }

  async deleteIdea(id: string) {
    const idea = await this.ideaRepository.findOne({where: {id}});
    if(!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.ideaRepository.delete({id});
    return {deleted: true};
  }
}
