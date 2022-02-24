import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    let jwtString: string = value.split('Bearer ')[1];
    console.log(this.authService.verify(jwtString));
    return this.authService.verify(jwtString);
  }
}
