import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { UserService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(
    @Body() data: CreateUserDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader?.split(' ')[1];
    return this.userService.createUser(data, token);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get(':id/session')
  async getSession(@Param('id') id: string) {
    return this.userService.getSessionForUser(id);
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader?.split(' ')[1];
    return this.userService.getUserById(id, token);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader?.split(' ')[1];
    return this.userService.updateUser(id, data, token);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader?.split(' ')[1];
    return this.userService.deleteUser(id, token);
  }
}
