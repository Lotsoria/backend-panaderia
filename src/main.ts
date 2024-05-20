import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'http://panaderia-dev.s3-website.us-east-2.amazonaws.com', // Frontend en S3
      'http://localhost:3000', // Localhost para pruebas locales
      'http://localhost:4200', // Localhost para pruebas locales
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('PANADERIA')
    .setDescription('Endpoints panaderia')
    .setVersion('1.0')
    .addTag('panaderia')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Este es el prefijo de la URL desde donde se servirán los archivos
  });
  await app.listen(3000);
}
bootstrap();
