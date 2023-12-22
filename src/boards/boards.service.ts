import { Injectable, NotFoundException } from '@nestjs/common';
import { Boards } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepoisotry } from './board.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepoisotry) {}

  async getBoardById(id: number): Promise<Boards> {
    const found = await this.boardsRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Boards> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Boards> {
    const board = await this.boardsRepository.findOneBy({ id: id });

    board.status = status;
    await this.boardsRepository.save(board);

    return board;
  }

  async getAllBoards(): Promise<Boards[]> {
    return this.boardsRepository.find();
  }
}
