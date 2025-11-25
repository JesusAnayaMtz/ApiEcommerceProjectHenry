import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUserDto.dto";

@Injectable()
export class UsersRepository {
  

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  

  async getUsers() {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

   async getUserByEmail(email: string) {
      return await this.userRepository.findOne({where: { email }});
    }

    getUserById(id: string) {
      return this.userRepository.findOne({where: { id }});
  }
  

  async getUserByIdOrders(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      }
    });

    if(!user) {
      return "Usuario No Encontrado"
    }

    return user
  }

  async updateUser(id: string, userDto: Partial<User>): Promise<User | { message: string }> {
    const userToUpdate = await this.userRepository.findOne({where: { id }});
    if (!userToUpdate) {
      return { message: 'User not found' };
    }
    Object.assign(userToUpdate, userDto);
    return this.userRepository.save(userToUpdate);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}