import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
const dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
