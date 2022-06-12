import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleExceptions } from './utils/handleExceptions';
import { buildSwaggerDocs } from './utils/buildSwaggerDocs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, host } = configService.get('server');

  buildSwaggerDocs(app, 'docs');

  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

bootstrap();
handleExceptions();
