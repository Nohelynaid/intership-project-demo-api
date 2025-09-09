import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common'
import { FieldType } from '@prisma/client';
import { FieldService } from 'src/services/field.service';

@Controller('api/fields')
export class FieldController {
    constructor(private readonly fieldService: FieldService) { }

    @Get()
    findAll() {
        return this.fieldService.findAll()
    }

    @Get(':inventoryId/all')
    findAllFieldsByInventory(@Param('inventoryId') inventoryId: string) {
        return this.fieldService.findAllFieldsByInventory(inventoryId)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.fieldService.findOne(id)
    }

    @Post()
    create(@Body() data: {
        name: string,
        inventoryId: string,
        key: string,
        type: FieldType,
        required: boolean,
        options: string[],
        position: number
    }) {
        return this.fieldService.create(data)
    }

    @Post("many")
    createMany(@Body() data: {
        name: string,
        inventoryId: string,
        key: string,
        type: FieldType,
        required: boolean,
        options: string[],
        position: number
    }[]) {
        return this.fieldService.createMany(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.fieldService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fieldService.remove(id)
    }
}
