import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.services";
import { CreateUserDto } from "./domain/dto/dto/CreateUser.dto";
import { UpdateUserDTO } from "./domain/dto/dto/updateUser.dto";
import { ParamId } from "src/shared/decorators/paramId.decorator";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    list() { 
        return this.userService.list();
    }

     @Get(':id')
    show(@ParamId() id: number) { 
        return this.userService.show(id);
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
      return this.userService.create(body);
    }

    @Patch(':id')
    updateUser(
        @ParamId() id: number,
        @Body() body: UpdateUserDTO,
    ) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    deleteUser(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}