import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  findOne(request: any) {
    try {
      return this.userService.findOne(request);
    } catch (error) {
      throw error;
    }
  }
}
