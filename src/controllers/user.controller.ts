import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { UserService } from 'src/services/user.service';

@Controller('api/users')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body() data: { email: string; name?: string }) {
        return this.usersService.create(data)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
