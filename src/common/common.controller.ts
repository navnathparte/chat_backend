import { Controller, Body, Post } from '@nestjs/common';
import { CommonService } from './common.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto, SaveUserDTO } from './dto/user.dto';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signUp(@Body() body: SaveUserDTO) {
    try {
      let { username, email, name, password } = body;
      const userData = await this.userService.findOne({ email });
      if (userData) {
        return {
          message: 'User already exist',
        };
      }
      password = await this.commonService.decryptPassword(password);
      await this.userService.create({ username, email, name, password });
      return {
        message: 'User Created',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
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
