import * as uuid from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 이미 가입된 유저인지 확인
   * 가입 유저가 아니라면? 유저 정보를 저장하고 이메일을 보냄
   * @param name
   * @param email
   * @param password
   * @returns
   * ! OK(200) 성공적으로 DB에 유저 정보 등록 후 이메일 전송했을 경우
   * @throws
   * ! BadRequestException DB에 이미 존재하는 이메일
   */
  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<Object> {
    const isExistUser = await this.checkUserExists(email);
    if (isExistUser) {
      console.log('[UsersService/createUser] Already Exist User');
      throw new BadRequestException('User Already Exist');
    }

    const signupVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
    console.log('[UsersService] Mail Sended');

    return {
      statusCode: 200,
      message: 'OK, Verify Email Sended',
    };
  }

  /**
   * 유저의 token을 db에서 조회해서 이메일 인증여부 갱신
   * @param signupVerifyToken 유저가 이메일로 받은 토큰
   * @returns
   * ! OK(200) 성공적으로 이메일 인증 완료
   * @throws
   * ! BadRequestException 올바르지 않은 토큰
   */
  async verifyUser(signupVerifyToken: string): Promise<Object> {
    let user = await this.userRepository.findOne({ signupVerifyToken });
    if (user === undefined) {
      throw new BadRequestException('Email verify token is invalid');
    }

    user.signupVerifyToken = null;
    await this.userRepository.save(user);
    return {
      statusCode: 200,
      message: 'OK, Complete email verify',
    };
  }

  /**
   * 로그인이 성공적으로 된 경우 토큰을 전달
   * @param email
   * @param plainPassword
   * @returns
   */
  async login(email: string, plainPassword: string): Promise<Object> {
    let user = await this.userRepository.findOne({ email });
    if (user === undefined) {
      throw new BadRequestException('Login Failed. Email is invalid');
    }

    if (user.signupVerifyToken !== null) {
      throw new BadRequestException('Email verify is unfinished');
    }

    let { uid, salt, password, name } = user;
    if (this.checkPasswordRight(salt, password, plainPassword)) {
      return {
        statusCode: 200,
        message: 'OK, Login Completed',
        token: 'Bearer ' + this.authService.login({ uid, email }),
        uid,
        name,
      };
    } else {
      throw new BadRequestException('Login Failed. Password is invalid');
    }
  }

  /**
   * 유저의 이메일을 db에서 확인해 존재하는지 확인.
   * @param email
   * @returns boolean
   */
  private async checkUserExists(email: string): Promise<boolean> {
    let user = await this.userRepository.findOne({ email });
    return user !== undefined;
  }

  /**
   * 새로 가입하는 유저를 db에 저장
   * @param name
   * @param email
   * @param password
   * @param signupVerifyToken
   */
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ): Promise<void> {
    const user = new UserEntity();

    const { salt, hashedPassword } = this.makeHashedPassword(password);
    user.name = name;
    user.email = email;
    user.salt = salt;
    user.password = hashedPassword;
    user.signupVerifyToken = signupVerifyToken;

    await this.userRepository.save(user).then((user) => {
      console.log('[UsersService] Save user', user);
    });
  }

  /**
   * 유저에게 가입 인증 이메일을 보낸다. (emailService에 양도)
   * @param email
   * @param signupVerifyToken
   */
  private async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  private makeHashedPassword(plainPassword: string): {
    salt: string;
    hashedPassword: string;
  } {
    const salt = crypto.randomBytes(64).toString();
    const hashedPassword = crypto
      .pbkdf2Sync(plainPassword, salt, 9610, 64, 'sha512')
      .toString();
    return { salt, hashedPassword };
  }

  private checkPasswordRight(salt, password, plainPassword) {
    const hashedPassword = crypto
      .pbkdf2Sync(plainPassword, salt, 9610, 64, 'sha512')
      .toString();

    return password === hashedPassword;
  }
}
