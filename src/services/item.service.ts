import { Injectable } from '@nestjs/common'
import { Item, Prisma } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<Item[]> {
        return this.prisma.item.findMany()
    }

    findOne(id: string): Promise<Item | null> {
        return this.prisma.item.findUnique({ where: { id } })
    }

    create(data: {
        inventoryId: string;
        invNumber: string;
        data: Prisma.InputJsonValue;
    }): Promise<Item> {
        return this.prisma.item.create({
            data: {
                inventoryId: data.inventoryId,
                invNumber: data.invNumber,
                data: data.data !== null ? data.data : Prisma.JsonNull,
            },
        });
    }

    update(id: string, data: Partial<Item>): Promise<Item> {
        return this.prisma.item.update({
            where: { id }, data: {
                inventoryId: data.inventoryId,
                invNumber: data.invNumber,
                data: data.data !== null ? data.data : Prisma.JsonNull,
            },
        })
    }

    remove(id: string): Promise<Item> {
        return this.prisma.item.delete({ where: { id } })
    }

    findItemsFromInventory(inventoryId: string) {
        return this.prisma.item.findMany({ where: { inventoryId } })
    }
}
