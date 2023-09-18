import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('The Chat API description')
    .setVersion('1.0')
    .addTag('CHAT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(port, () => {
    console.log(`server is running on port ` + port);
  });
  
}
bootstrap();
