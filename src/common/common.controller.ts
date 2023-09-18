import { Controller, Body, Post } from '@nestjs/common';
import { CommonService } from './common.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() body: any) {
    try {
      let { email, password } = body;
      const userData = await this.userService.findOne({ email });

      if (!userData) {
        return {
          message: 'Username or password not match.',
          status: 401,
        };
      }

      const passMatched = await this.commonService.checkPassword(
        password,
        email,
      );

      if (userData && passMatched) {
        const token = await this.commonService.generateAccessToken({
          data: userData,
        });
        return {
          token,
          message: 'User login sucessfully',
        };
      } else {
        return { message: 'username and password doesnot matched' };
      }
    } catch (error) {
      throw error;
    }
  }
}
