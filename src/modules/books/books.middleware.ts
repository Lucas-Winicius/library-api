import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userCookie = req.headers.authorization.split(' ')[1];
      const token = await this.jwt.verifyAsync(userCookie);
      const user = await this.prisma.user.findUnique({
        where: { id: token.id },
      });

      if (!user.admin) throw new UnauthorizedException();

      next();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
