import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from 'src/boards/board.entity';
import { BoardsRepoisotry } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Boards])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepoisotry],
})
export class BoardsModule {}
