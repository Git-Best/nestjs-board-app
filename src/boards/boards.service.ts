import { Injectable, NotFoundException } from '@nestjs/common';
import { Boards } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepoisotry } from './board.repository';

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

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id : ${id}`);
  //   }

  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
