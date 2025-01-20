import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

      app.enableCors({
        origin: (origin, callback) => {
          const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3001',
            'http://localhost:3000',
            'http://167.71.195.218:3000',
          ];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new BadRequestException('Not allowed by CORS'));
          }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      });


    const config = new DocumentBuilder()
      .setTitle('Furnioro')
      .setDescription('Furnioro RES API')
      .setVersion('1.0')
      .addTag(
        'NESTJS, Validation, swagger, guard, pg, mailer, sms, cookie, ...',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
