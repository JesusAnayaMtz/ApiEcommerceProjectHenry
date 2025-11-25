import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerDataGlobal } from './middlewares/loggerData.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerDataGlobal)
  app.useGlobalPipes(new ValidationPipe())
  const swaggerConfiguration = new DocumentBuilder()
          .setTitle('Proyecto Henry Modulo 4 Ecommerce')
          .setDescription('Este es mi proyecto del modulo 4 backend, que consiste en un sistema ecommerce')
          .setVersion('1.0')
          .addBearerAuth()
          .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfiguration)

  SwaggerModule.setup('api',app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
