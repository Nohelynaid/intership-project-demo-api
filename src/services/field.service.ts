import { Injectable } from '@nestjs/common'
import { Field, FieldType } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class FieldService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<Field[]> {
        return this.prisma.field.findMany()
    }

    findOne(id: string): Promise<Field | null> {
        return this.prisma.field.findUnique({ where: { id } })
    }

    create(data: {
        name: string,
        inventoryId: string,
        key: string,
        type: FieldType,
        required: boolean,
        options: string[],
        position: number
    }): Promise<Field> {
        return this.prisma.field.create({ data })
    }

    async createMany(data: {
        name: string;
        inventoryId: string;
        key: string;
        type: FieldType;
        required: boolean;
        options: string[];
        position: number;
    }[]): Promise<{ count: number }> {
        return await this.prisma.field.createMany({ data });
    }

    update(id: string, data: Partial<Field>): Promise<Field> {
        return this.prisma.field.update({ where: { id }, data })
    }

    remove(id: string): Promise<Field> {
        return this.prisma.field.delete({ where: { id } })
    }

    findAllFieldsByInventory(inventoryId: string): Promise<Field[]> {
        return this.prisma.field.findMany({ where: { inventoryId } })
    }
}
