import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    try {
      let jwtString = request.headers.authorization.split('Bearer ')[1];
      this.authService.verify(jwtString);
      console.log('[AuthGuard] Auth Success');
      return true;
    } catch (e) {
      console.log('[AuthGuard] Auth Fail', e);
      return false;
    }
  }
}
