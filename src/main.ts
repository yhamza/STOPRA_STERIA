import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
// Create the app
const app = await NestFactory.create(AppModule);

// Set the global API prefix (e.g., /api/v1)
app.setGlobalPrefix('api/v1');

// Generate the Swagger documentation
const document = createDocument(app);

// Setup Swagger UI at /api (this is where the Swagger UI will be accessible)
SwaggerModule.setup('api', app, document);

// Listen on port
await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
