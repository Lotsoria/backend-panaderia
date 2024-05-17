import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: [
   	 'http://panaderia-dev.s3-website.us-east-2.amazonaws.com', // Frontend en S3
    	 'http://localhost:3000' // Localhost para pruebas locales
  	],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Este es el prefijo de la URL desde donde se servirán los archivos
  });
  await app.listen(3000);
}
bootstrap();
