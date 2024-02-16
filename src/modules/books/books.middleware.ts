import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userCookie = req.headers.authorization.split(' ')[1];
      await this.jwt.verifyAsync(userCookie);
      next();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
