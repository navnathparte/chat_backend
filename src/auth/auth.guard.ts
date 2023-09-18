import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('here');

    // let accessToken: string = request.header('authorization');

    let authorization: string = request.headers;

    if (!authorization) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    // authorization = authorization?.substr(7, authorization?.length);

    const _res = jwt.verify(authorization, process.env.ACCESS_TOKEN_KEY) as {
      data: { email: string };
    };

    const result = await this.authService.findOne({
      email: _res?.data?.email,
    });

    return true;
  }
}
