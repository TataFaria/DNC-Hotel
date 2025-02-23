import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.services";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
     async list() { 
        return await this.userService.list();
    }

     @Get(':id')
    show(@Param('id') id: string) { 
        return this.userService.show(id);
    }

    @Post()
    createUser(@Body() body: any) {
      return this.userService.create(body);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: any) {
        return this.userService.update(id, body);
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}