import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import * as config from 'config';


async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: serverConfig.origin,
    });
    logger.log(`Cors Has been enabled for the origin : ${serverConfig.origin}`);
  }
  const port = process.env.PORT || serverConfig.port;

  await app.listen(port ,()=>{
    logger.log(`Application listening on port : ${port}`)
  });
}
bootstrap();
