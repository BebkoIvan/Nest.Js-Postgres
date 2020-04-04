import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('idea')
export class IdeaController {

	constructor(private ideaService: IdeaService) {}

	@Get() showAllIdeas() {
			return this.ideaService.getAllIdeas();
		}
		
 @Post()
 @UsePipes(new ValidationPipe())
 	createIdea(@Body() idea: IdeaDTO) {
			return this.ideaService.createIdea(idea);
		}

		@Get(':id') getOneIdea(@Param('id') id: string) {
			return this.ideaService.readOneIdea(id);
		}

		@Put(':id') updateIdea(@Param('id') id: string, @Body()idea: Partial<IdeaDTO>) {
			return this.ideaService.updateIdea(id, idea);
		}

		@Delete(':id') deleteIdea() {

		}
		
}
