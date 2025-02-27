import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.services";
import { CreateUserDto } from "./domain/dto/dto/CreateUser.dto";
import { UpdateUserDTO } from "./domain/dto/dto/updateUser.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
     async list() { 
        return await this.userService.list();
    }

     @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) { 
        return this.userService.show(id);
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
      return this.userService.create(body);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.userService.update(id, body);
    }
    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}