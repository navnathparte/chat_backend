import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
