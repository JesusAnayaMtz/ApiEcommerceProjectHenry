import { Injectable } from "@nestjs/common";
import { In } from "typeorm";
import { CategoriesRepository } from "./categories.repository";
import { Category } from "./category.entity";

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository){}

    async addCategoriesService() {
        return await this.categoriesRepository.addCategories();
    }

    async getCategoriesService(){
        return await this.categoriesRepository.getCategories();
    }

    async getCategoryByIdService(id: string){
        return await this.categoriesRepository.getCategoryById(id);
    }

}