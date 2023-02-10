import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.setGlobalPrefix('/_api/v2.1/bolacha');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const version = 'v2.1'
  // swagger config

  const config = new DocumentBuilder()
  .setTitle('Bolacha maria api')
  .setDescription(`Bolacha maria api ${version} is open`)
  .setVersion(version)
  .addTag('Bolacha')
  .build()

  const document =  SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('api',app,document)

  await app.listen(3000);
}
bootstrap();
