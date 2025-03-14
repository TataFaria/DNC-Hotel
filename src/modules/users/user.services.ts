import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from './domain/dto/createUser.dto'
import { UpdateUserDTO } from './domain/dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { userSelectFields } from '../prisma/utils/userSelectFields';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(body: CreateUserDto): Promise<User> {
        body.password = await this.hashPassword(body.password);
        return await this.prisma.user.create({
            data: body,
            select: userSelectFields
        });
    }

    async list() {
        return await this.prisma.user.findMany({
            select: userSelectFields
        });
    }

    async show(id: number) {
      const user = await this.isIdExists(id);
        return user;
    }

    async update(id: number, body: UpdateUserDTO) {
        await this.isIdExists(id);

        if (body.password) {
            body.password = await this.hashPassword(body.password);
        }
        
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
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: userSelectFields
        });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
            
        return !!user;
    }   

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
};
   
