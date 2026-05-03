import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Examen')
    .setDescription('API para administracion de tienda')
    .setVersion('1.0')
    .addBearerAuth() 
    .addServer("http://localhost:3000", "Servidor local")
    .addServer("http://api-saes.render.com", "Servidor de producción")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
