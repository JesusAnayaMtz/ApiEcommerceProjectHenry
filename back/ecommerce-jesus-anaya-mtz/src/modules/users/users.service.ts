import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/createUserDto.dto";
import { UpdateUserDto } from "./dto/updateUserDto.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers() {
    const users = await this.usersRepository.getUsers();
    return users.map(user => {
      const { password, isAdmin, ...usersReturn } = user;
      return usersReturn;
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.createUser(user);
    return newUser;
  }

  async getUserById(id: string) {
    const userFound = await this.usersRepository.getUserByIdOrders(id);

    if (!userFound || typeof userFound === 'string') {
      throw new Error('User not found');
    }
    
    const { password, isAdmin, ...userException } = userFound;
    return userException;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<Omit<User, 'password' | 'isAdmin'>> {
    const userToUpdate = await this.usersRepository.getUserById(id);
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    if(user.password){
        const hashedPassword = await bcrypt.hash(user.password, 10);

        if(!hashedPassword){ 
            throw new Error('Error hashing password'); 
        }
        user.password = hashedPassword; 
    }

    await this.usersRepository.updateUser(id, user);

    const updatedUser = await this.getUserById(id);

    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {


    const userToDelete = await this.usersRepository.getUserById(id);
    if (!userToDelete) {
      throw new Error('User not found');
    }

    if(userToDelete.orders && userToDelete.orders.length > 0){
      throw new Error('User has orders and cannot be deleted');
    }

    try {
      await this.usersRepository.deleteUser(id);
      return userToDelete;
    } catch (error) {
      throw new Error('Error deleting user has orders related');
    }

  }
}