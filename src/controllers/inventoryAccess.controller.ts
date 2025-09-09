import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { InventoryAccessService } from 'src/services/inventoryAccess.service';

@Controller('api/inventory-access')
export class InventoryAccessController {
    constructor(private readonly inventoryAccessService: InventoryAccessService) { }

    @Get()
    findAll() {
        return this.inventoryAccessService.findAll()
    }

    @Get(':inventoryId/all')
    findAllInventoryAccessFromInventory(@Param('inventoryId') inventoryId: string) {
        return this.inventoryAccessService.findAllInventoryAccessFromInventory(inventoryId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inventoryAccessService.findOne(id)
    }

    @Post()
    create(@Body() data: { inventoryId: string, userId: string, canWrite: boolean }) {
        return this.inventoryAccessService.create(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.inventoryAccessService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inventoryAccessService.remove(id)
    }
}
