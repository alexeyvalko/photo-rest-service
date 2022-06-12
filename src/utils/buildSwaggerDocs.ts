import { INestApplication } from '@nestjs/common/interfaces';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const buildSwaggerDocs = (app: INestApplication, path: string) => {
  const config = new DocumentBuilder()
    .setTitle('Image app REST Service')
    .setDescription('The app API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
