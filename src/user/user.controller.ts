import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: any, @Req() request: any) {
    console.log('ata bagu', request.decoded._id);
  }

  @Get('/users')
  async getAllUsers(@Req() request: any) {
    try {
      const _id = request.decoded._id;
      console.log('-id', _id);

      const userData = await this.userService.find({
        _id: {
          $ne: _id,//not equal
        },
      });

      console.log('userData', userData);
    } catch (error) {
      throw error;
    }
  }
}
