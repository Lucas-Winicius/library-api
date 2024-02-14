import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(32)
  nick: string;

  @MinLength(3)
  @MaxLength(256)
  name: string;

  @IsString()
  @MinLength(8)
  pass: string;
}
