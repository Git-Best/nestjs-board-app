import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { BoardRepoisotry } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepoisotry],
})
export class BoardsModule {}
