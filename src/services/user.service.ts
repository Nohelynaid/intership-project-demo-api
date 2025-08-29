import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } })
    }

    create(data: { email: string; name?: string }): Promise<User> {
        return this.prisma.user.create({ data })
    }

    update(id: string, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({ where: { id }, data })
    }

    remove(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id } })
    }
}
