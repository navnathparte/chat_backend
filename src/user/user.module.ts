import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[CommonModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
