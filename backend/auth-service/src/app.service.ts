import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma_auth/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // async register(registerDto: RegisterDto) {
  //   const { email, password, firstName ,lastName} = registerDto; // Destructure email and password
  //   // Check if user already exists
  //   const user = await this.userRepository.findByEmail(registerDto.email);
  //   if (user) {
  //     throw new UnauthorizedException('User already exists');
  //   }
  //   return this.userRepository.createUser(email, password);
  // }
  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: any; token: string }> {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash mật khẩu trước khi lưu vào DB
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Tạo người dùng mới (trong repository, bạn nên lưu thông tin với mật khẩu đã được hash)
    const createdUser = await this.userRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    // Tạo payload cho JWT token
    const payload = { sub: createdUser.id, email: createdUser.email };
    const token = this.jwtService.sign(payload);

    return { user: createdUser, token };
  }

  // async login(email: string, password: string) {
  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const token = this.jwtService.sign({ id: user.id, email: user.email });
  //   return { accessToken: token };
  // }

  async login(loginDto: LoginDto): Promise<{ user: any; token: string }> {
    // Tìm người dùng theo email
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Tạo payload cho JWT token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, user: decoded };
    } catch (err) {
      return { valid: false };
    }
  }
}
