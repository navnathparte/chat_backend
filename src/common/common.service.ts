import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
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

  async decryptPassword(password: string) {
    try {
      // Generate a salt with a cost factor of 10
      const salt = bcrypt.genSaltSync(10);
  
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Return the hashed password
      return hashedPassword;
    } catch (error) {
      // If there's an error during the hashing process, throw it
      throw error;
    }
  }
}
