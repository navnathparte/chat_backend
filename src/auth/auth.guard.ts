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

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  
  async authMiddleware(
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) {
    try {
      let accessToken: string | undefined = req.header('authorization');

      if (!accessToken) {
        res.status(401).json({ message: 'Unauthorized user' });
        return;
      }
      accessToken = accessToken?.substr(7, accessToken?.length);

      const _res = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as {
        data: { email: string };
      };

      // User.findOne({ email: _res?.data?.email }).then((result: any) => {
      //   req.user = result;
      //   next();
      // });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async generateAccessToken(data: any): Promise<string> {
    try {
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '10d',
      });
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
