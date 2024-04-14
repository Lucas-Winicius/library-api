import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Response,
  Headers,
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

    res.json({
      user: { nick: user.user.nick, name: user.user.name },
      secret: user.secret,
      role: user.user.admin ? 'ADMIN' : 'DEFAULT',
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('token')
  findOneToken(@Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.usersService.findUserByToken(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('n/:nick')
  findOneNick(@Param('nick') nick: string) {
    return this.usersService.findOneByNick(nick);
  }

  @Patch(':id')
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

    res.json({
      user: {
        nick: user.user.nick,
        name: user.user.name,
      },
      secret: user.secret,
      role: user.user.admin ? 'ADMIN' : 'DEFAULT',
    });
  }
}
