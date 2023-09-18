import * as jwt from 'jsonwebtoken';
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
    let request = context.switchToHttp().getRequest();
    // console.log('here');

    // let accessToken: string = request.header('authorization');

    let { authorization } = request.headers;
    // console.log(authorization);

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide token');
    }
    const authorizationString = authorization.replace(/bearer/gim, '').trim();

    const decodedPayload = jwt.verify(authorizationString, 'anku');

    const result = JSON.parse(JSON.stringify(decodedPayload)).data;

    if (result) {
      request['decoded'] = { ...result };
      return true;
    }
    else {
      throw  new HttpException("Unauthorized",401 )
    }
  }
}
