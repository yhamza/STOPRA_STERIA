import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

app.setGlobalPrefix('api/v1');

const document = createDocument(app);

SwaggerModule.setup('api', app, document);

await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
