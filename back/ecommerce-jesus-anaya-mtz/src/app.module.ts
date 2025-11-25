import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>  {
        const typeOrmConfig = configService.get("typeorm");
        if (!typeOrmConfig) {
          throw new Error("TypeORM configuration not found in environment variables");
        }
        return typeOrmConfig;
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule, ProductsModule, AuthModule, OrdersModule, CategoriesModule, FileUploadModule],
  controllers: [],
  providers: [SeederService],
})
export class AppModule implements OnApplicationBootstrap{

  constructor(private readonly seederService: SeederService){}
  async onApplicationBootstrap() {
    await this.seederService.seed();
  }
}
