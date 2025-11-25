import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import data from '../utils/seeder.json'

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategories() {
    for (const element of data) {
      const categoryExists = await this.categoriesRepository.findOne({
        where: { name: element.category },
      });
      //Si no existe la categoria, la creo
      if (!categoryExists) {
        const newCategory = this.categoriesRepository.create({
          name: element.category,
        });
        await this.categoriesRepository.save(newCategory);
      }
    }
    return 'Categories added';
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async getCategoryById(categoryId: string) {
    return await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
  }

  }
