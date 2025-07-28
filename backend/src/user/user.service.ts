import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async create(user: User): Promise<User> {
        return this.prisma.user.create({
            data: user
        });
    }

    async update(email: string, updateUser: Partial<User>): Promise<User | null> {
        const user = await this.findOne(email);
        if (user) {
            return this.prisma.user.update({
                where: { email },
                data: updateUser
            });
        }
        return null;
    }
}