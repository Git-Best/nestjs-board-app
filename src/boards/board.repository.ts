import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Boards } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsRepoisotry extends Repository<Boards> {
  constructor(private readonly dataSource: DataSource) {
    super(Boards, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Boards> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
