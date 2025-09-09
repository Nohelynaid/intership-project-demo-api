import { Injectable } from '@nestjs/common'
import { Numbering } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class NumberingService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<Numbering[]> {
        return this.prisma.numbering.findMany()
    }

    findOne(id: string): Promise<Numbering | null> {
        return this.prisma.numbering.findUnique({ where: { id } })
    }

    create(data: {
        inventoryId: string,
        pattern: string,
        counter: number,
    }): Promise<Numbering> {
        return this.prisma.numbering.create({ data })
    }

    update(id: string, data: Partial<Numbering>): Promise<Numbering> {
        return this.prisma.numbering.update({ where: { id }, data })
    }

    remove(id: string): Promise<Numbering> {
        return this.prisma.numbering.delete({ where: { id } })
    }

    findNumberingFromInventory(inventoryId: string) {
        return this.prisma.numbering.findUnique({ where: { inventoryId } })
    }
}
