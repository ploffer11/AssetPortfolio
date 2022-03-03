import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

export interface UserInfo {
  uid: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor() {}

  /**
   * 유저 정보(email, uid)를 payload로 jwtString을 반환
   * @param user
   * @returns jwtString
   */
  login(user: UserInfo): string {
    const payload = { ...user };

    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1d',
      audience: 'Asset Portfolio Frontend',
      issuer: 'Asset Portfolio Backend',
    });
  }

  /**
   * 전달 받은 jwtString으로 유저의 uid와 email을 추출
   * @param jwtString
   * @returns {uid, email}
   * @throws UnauthorizedException 토큰이 올바르지 않을 경우
   */
  verify(jwtString: string): UserInfo {
    try {
      const { uid, email } = jwt.verify(jwtString, process.env.SECRET_KEY) as (
        | jwt.JwtPayload
        | string
      ) &
        UserInfo;

      return {
        uid,
        email,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Verify Failed. JWT Token is invalid');
    }
  }
}
