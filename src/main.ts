import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const defaultPort = 3000;
  await app.listen(process.env.PORT || defaultPort,()=>{
    logger.log(`Application listening on port : ${process.env.PORT || defaultPort}`)
  });
}
bootstrap();
