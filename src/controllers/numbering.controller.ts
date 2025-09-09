import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { NumberingService } from 'src/services/numbering.service';

@Controller('api/numberings')
export class NumberingController {
    constructor(private readonly numberingService: NumberingService) { }

    @Get()
    findAll() {
        return this.numberingService.findAll()
    }

    @Get(':inventoryId/one')
    async findNumberingFromInventory(@Param('inventoryId') inventoryId: string) {
        const res = await this.numberingService.findNumberingFromInventory(inventoryId);
        return res || {};
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.numberingService.findOne(id)
    }

    @Post()
    create(@Body() data: {
        inventoryId: string,
        pattern: string,
        counter: number,
    }) {
        return this.numberingService.create(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.numberingService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.numberingService.remove(id)
    }
}
