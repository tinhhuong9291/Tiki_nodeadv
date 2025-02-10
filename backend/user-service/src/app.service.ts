import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepository } from './repositories/user.repository';
import { ClientProxy } from '@nestjs/microservices';
import { SessionService } from './services/session.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async validateToken(token: string): Promise<any> {
    const result = await this.authClient
      .send({ cmd: 'validate_token' }, { token })
      .toPromise();
    if (!result || result.valid !== true) {
      throw new UnauthorizedException('Invalid token');
    }
    return result;
  }
  async createUser(data: CreateUserDto, token: string) {
    await this.validateToken(token);
    return this.userRepository.createUser(data);
  }

  async getUserById(id: string, token: string) {
    await this.validateToken(token);
    const user = await this.userRepository.findById(id);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto, token: string) {
    await this.validateToken(token);
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string, token: string) {
    await this.validateToken(token);
    return this.userRepository.deleteUser(id);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // So sánh mật khẩu (sử dụng bcrypt)
    const isMatch = await require('bcryptjs').compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Tạo JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    // Lưu token vào Redis (session) với user.id làm key
    await this.sessionService.setSession(user.id, token);

    return { token };
  }

  // Ví dụ: Kiểm tra session của user
  async getSessionForUser(userId: string): Promise<string | null> {
    return await this.sessionService.getSession(userId);
  }
}
