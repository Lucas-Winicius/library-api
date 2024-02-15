import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;

  @IsNotEmpty()
  author: string;
}
