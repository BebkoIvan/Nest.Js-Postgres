import { Module} from '@nestjs/common';
import { IdeaController } from './idea/idea.controller';
import { IdeaService } from './idea/idea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from './idea.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [IdeaService, {
    provide: APP_PIPE, useClass: ValidationPipe
  }]
})
export class IdeaModule {}
