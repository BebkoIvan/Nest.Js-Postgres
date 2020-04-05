import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	UsePipes,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/idea')
export class IdeaController {
	constructor(private ideaService: IdeaService) {}

	@Get() showAllIdeas() {
		return this.ideaService.getAllIdeas();
	}

  @Post()
  @UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	createIdea(@User('id') userId, @Body() idea: IdeaDTO) {
		return this.ideaService.createIdea(userId, idea);
	}

	@Get(':id') 
	getOneIdea(@Param('id') id: number) {
		return this.ideaService.readOneIdea(id);
	}

  @Put(':id')
  @UseGuards(new AuthGuard())
  updateIdea(
    @User('id') userId: number,
		@Param('id') id: number,
		@Body() idea: Partial<IdeaDTO>,
	) {
		return this.ideaService.updateIdea(id, userId, idea);
	}

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteIdea(@User('id') userId: number, @Param('id') id: number,) {
    return this.ideaService.deleteIdea(id, userId);
  }
}
