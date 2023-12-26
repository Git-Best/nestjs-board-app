import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any): BoardStatus {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
