import { Injectable } from '@nestjs/common'
import { Inventory } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<Inventory[]> {
        return this.prisma.inventory.findMany()
    }

    findOne(id: string): Promise<Inventory | null> {
        return this.prisma.inventory.findUnique({ where: { id } })
    }

    create(data: { code: string; name: string, description: string, ownerId: string, isPublic: boolean, image: string | null }): Promise<Inventory> {
        try {
            return this.prisma.inventory.create({ data })
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    update(id: string, data: Partial<Inventory>): Promise<Inventory> {
        return this.prisma.inventory.update({ where: { id }, data })
    }

    remove(id: string): Promise<Inventory> {
        return this.prisma.inventory.delete({ where: { id } })
    }

    findInventoryFromUser(ownerId: string) {
        return this.prisma.inventory.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                owner: true,
                code: true,
                updatedAt: true,
                _count: {
                    select: { items: true },
                }
            },
            where: {
                ownerId
            }
        })
    }

    async findAllWithItemCounts() {
        // we mark this method as async, cause we need to manipulate the data
        const inventories = await this.prisma.inventory.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                description: true,
                owner: true,
                _count: {
                    select: { items: true },
                },
            },
        });

        return inventories.sort((a, b) => b._count.items - a._count.items);
    }

    async findTags() {
        const distinctNames = await this.prisma.inventory.findMany({
            distinct: ['name'],
            select: { name: true },
        });
        return distinctNames.map(item => item.name);
    }
}
