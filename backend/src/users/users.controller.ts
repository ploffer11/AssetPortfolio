import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
  Redirect,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { ParseTokenPipe } from 'src/pipe/parse-token.pipe';

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

  @Redirect(`${process.env.FRONTEND_URL}/login`, 301)
  @Get('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<Object> {
    const { signupVerifyToken } = dto;
    console.log('[GET] /email-verify', signupVerifyToken);
    return this.usersService.verifyUser(signupVerifyToken.toString());
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<Object> {
    const { email, password } = dto;
    console.log('[POST] /users/login ');
    return this.usersService.login(email, password);
  }

  @Get('/balance')
  async getBalance(@Query('authorization', ParseTokenPipe) { uid }) {
    console.log('[GET] /users/balance');
    return await this.usersService.getBalance(uid);
  }

  @Post('/balance')
  async saveBalance(
    @Body('authorization', ParseTokenPipe) { uid },
    @Body('balance', ParseIntPipe) balance,
  ) {
    console.log('[POST] /users/balance');
    return this.usersService.saveBalance(uid, balance);
  }
}
