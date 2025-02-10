import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SessionService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  // Lưu token (hoặc session data) cho một user cụ thể
  async setSession(userId: string, token: string, ttl?: number): Promise<void> {
    // Sử dụng userId làm key
    await this.cacheManager.set(`session_${userId}`, token, ttl || 3600);
  }

  // Lấy token (hoặc session data) dựa trên userId
  async getSession(userId: string): Promise<string | null> {
    return await this.cacheManager.get(`session_${userId}`);
  }

  // Xóa session khi logout hoặc hết hạn
  async deleteSession(userId: string): Promise<void> {
    await this.cacheManager.del(`session_${userId}`);
  }
}
