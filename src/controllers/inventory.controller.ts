import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common'
import { InventoryService } from 'src/services/inventory.service';

@Controller('api/inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get()
    findAll() {
        return this.inventoryService.findAllWithItemCounts()
    }

    @Get('top5')
    @UseInterceptors(CacheInterceptor)
    async top5Inventories() {
        const inventories = await this.inventoryService.findAllWithItemCounts();
        return inventories.slice(0, 5);
    }

    @Get('tags')
    @UseInterceptors(CacheInterceptor)
    async tags() {
        return this.inventoryService.findTags();
    }

    @Get(':ownerId/all')
    async inventoryFromUser(@Param('ownerId') ownerId: string) {
        return this.inventoryService.findInventoryFromUser(ownerId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id)
    }

    @Post()
    create(@Body() data: { code: string; name: string, description: string, ownerId: string, isPublic: boolean, image: string | null }) {
        return this.inventoryService.create(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.inventoryService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id)
    }
}
