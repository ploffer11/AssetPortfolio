import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<Object> {
    const { name, email, password } = dto;
    console.log('[POST] /users', name, email, password);
    return this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<Object> {
    const { signupVerifyToken } = dto;
    console.log('[POST] /email-verify', signupVerifyToken);
    return this.usersService.verifyUser(signupVerifyToken.toString());
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<Object> {
    const { email, password } = dto;
    return this.usersService.login(email, password);
  }
}
