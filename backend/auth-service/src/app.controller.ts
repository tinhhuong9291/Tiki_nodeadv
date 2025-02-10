import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './app.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(
    // @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  register(data: RegisterDto) {
    // return this.authService.send({ cmd: 'register' }, data);
    return this.authService.register(data);
  }

  @MessagePattern({ cmd: 'login' })
  login(data: LoginDto) {
    // return this.authService.send({ cmd: 'login' }, data);
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(data: { token: string }) {
    const result = await this.authService.validateToken(data.token);
    return result;
  }
}
