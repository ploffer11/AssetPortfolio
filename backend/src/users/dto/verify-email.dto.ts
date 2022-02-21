import { IsUUID } from 'class-validator';

export class VerifyEmailDto {
  @IsUUID('all')
  signupVerifyToken: String;
}
