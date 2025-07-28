import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async login(username: string, password: string, system: string) {
    const apiUrl = 'https://api.thirdparty.com/userinfo';

    let response;
    try {
      response = await axios.post(process.env.CREATE_API_URL || apiUrl,
        {
          username,
          password,
          system,
        },
        {
          headers: { Authorization: `Basic ${process.env.BASIC_AUTH}` },
        }
      );
    } catch (err) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu!');
    }

    if (response.data.success) {
      const data = response.data.data;
      const email = data.email;
      const name = data.name;
      const lastUpdated = new Date(data.updatedAt);
      const token = response.data.token;

      let user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email },
          ],
        },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            name,
            lastUpdated
          },
        });
      }

      return {
        code: 200,
        message: 'Đăng nhập thành công!',
        user,
        token
      };
    }
  }
}
