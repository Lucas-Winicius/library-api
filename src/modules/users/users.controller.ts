import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import CookieOptions from './constants/cookiesOptions';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const user = await this.usersService.create(createUserDto);

    res.cookie('userAuthToken', user.secret, CookieOptions);

    res.cookie(
      'userRole',
      user.user.admin ? 'ADMIN' : 'DEFAULT',
      CookieOptions,
    );

    res.json(user.user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('n/:nick')
  findOneNick(@Param('nick') nick: string) {
    return this.usersService.findOneByNick(nick);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('signin')
  async signin(
    @Body('credentials') credentials: { nick: string; pass: string },
    @Response() res,
  ) {
    const user = await this.usersService.signin(credentials);

    res.cookie('userAuthToken', user.secret, CookieOptions);

    res.cookie(
      'userRole',
      user.user.admin ? 'ADMIN' : 'DEFAULT',
      CookieOptions,
    );

    res.json(user.user);
  }
}
