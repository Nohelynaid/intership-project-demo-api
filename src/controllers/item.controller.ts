import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { Prisma } from '@prisma/client';
import { ItemService } from 'src/services/item.service';

@Controller('api/items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    findAll() {
        return this.itemService.findAll()
    }

    @Get(':inventoryId/all')
    findItemsFromInventory(@Param('inventoryId') inventoryId: string) {
        return this.itemService.findItemsFromInventory(inventoryId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemService.findOne(id)
    }

    @Post()
    create(@Body() data: {
        inventoryId: string,
        invNumber: string,
        data: Prisma.InputJsonValue
    }) {
        return this.itemService.create(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.itemService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.itemService.remove(id)
    }


}
