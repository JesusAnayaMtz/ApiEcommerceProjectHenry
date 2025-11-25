import { Injectable, NotFoundException } from '@nestjs/common';
import data from '../utils/seeder.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { CreateProductDto } from './dto/createProduct.dto';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const startIndex = (page - 1) * limit;
    return await this.productsRepository.find({
      skip: startIndex,
      take: limit,
      relations: ['category'], 
    });
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const relatedCategory = categories.find((category) => category.name === element.category); 

      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = relatedCategory as Category;

      await this.productsRepository.createQueryBuilder(). 
      insert().into(Product).values(product) 
      .orUpdate(['description', 'price','stock'], ['name']) 
      .execute(); //ejecutamos la query
    })

    return 'Productos Agregados'

  }

  async createProduct(productDto: CreateProductDto) {
    const productExists = await this.productsRepository.findOne({
      where: { name: productDto.name }
    });
    if(productExists) {
      return { message: 'Product already exists' };
    }
    return await this.productsRepository.save(productDto);
  }

  async updateProduct(id: string, productDto: Partial<Product>): Promise<Product | null> {
    const productUpdate = await this.productsRepository.findOne({where: {id}});

    if(!productUpdate) {
      return null;
    }

    Object.assign(productUpdate, productDto);
    return this.productsRepository.save(productUpdate);
  }

 
  async getProductById(id: string) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['category']
    });
  }

  async deleteProduct(id: string) {
    const productExists = await this.productsRepository.findOne({
      where: { id }
    });
    if(!productExists) {
      return { message: 'Product not found' };
    }
    return await this.productsRepository.delete(id);
  }
}
