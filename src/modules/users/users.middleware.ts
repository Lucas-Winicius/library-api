import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AuthMiddlewareUser implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userEditedId = req.url.split('/')[1];
      const userCookie = req.headers.authorization.split(' ')[1];
      const token = await this.jwt.verifyAsync(userCookie);
      const user = await this.prisma.user.findUnique({
        where: { id: token.id },
      });

      if (user.id === userEditedId) return next();

      if (user.admin) return next();

      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
