import { Injectable } from '@nestjs/common'
import { InventoryAccess } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class InventoryAccessService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<InventoryAccess[]> {
        return this.prisma.inventoryAccess.findMany()
    }

    findOne(id: string): Promise<InventoryAccess | null> {
        return this.prisma.inventoryAccess.findUnique({ where: { id } })
    }

    create(data: { inventoryId: string, userId: string, canWrite: boolean }): Promise<InventoryAccess> {
        return this.prisma.inventoryAccess.create({ data })
    }

    update(id: string, data: Partial<InventoryAccess>): Promise<InventoryAccess> {
        return this.prisma.inventoryAccess.update({ where: { id }, data })
    }

    remove(id: string): Promise<InventoryAccess> {
        return this.prisma.inventoryAccess.delete({ where: { id } })
    }

    async findAllInventoryAccessFromInventory(inventoryId: string): Promise<{ user: { name: string; id: string } }[]> {
        const accessList = await this.prisma.inventoryAccess.findMany({
            where: { inventoryId },
            select: {
                user: {
                    select: { id: true, name: true },
                },
            },
        });

        return accessList.map(({ user }) => ({
            user: {
                id: user.id,
                name: user.name ?? '—',
            },
        }));
    }
}
