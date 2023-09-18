import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommonService {
  constructor(private readonly userService: UserService) {}

  async checkPassword(pass: string, email: string) {
    const userInfo = await this.userService.findOne({ email });

    const { password } = userInfo;
    return await bcrypt.compare(pass, password);
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
