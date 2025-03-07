import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./domain/dto/dto/CreateUser.dto";
import { UpdateUserDTO } from "./domain/dto/dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(body: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({data: body});
    }

    async list() {
        return await this.prisma.user.findMany();
    }

    async show(id: number) {
      const user = await this.isIdExists(id);
        return user;
    }

    async update(id: number, body: UpdateUserDTO) {
        await this.isIdExists(id);
        return await this.prisma.user.update({
            where: { id },
            data: body,
        });
    }

    async delete(id: number) {
        await this.isIdExists(id);
        return await this.prisma.user.delete({ where: { id }});
    }

    async isIdExists(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
            
        return !!user;
    }   
};
   
