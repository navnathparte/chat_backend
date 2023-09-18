import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(request: any) {
    return this.userModel.findOne(request)
  }
}
