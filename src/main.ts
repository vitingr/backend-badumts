import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'
import { urlencoded, json } from 'express';

async function bootstrap() {
  // Create a new AppModule
  const app = await NestFactory.create(AppModule);

  // Enable Cors
  app.use(cors())
  app.enableCors({
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  // Limit max. response file limit 
  app.use(json({limit: '50mb'}))
  app.use(urlencoded({extended: true, limit: '50mb'}))

  // Start Server
  await app.listen(process.env.PORT || 3030);
}
bootstrap();
