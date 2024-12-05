import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

// Importation des entités
import { UserEntity } from './database/entities/user.entity';
import { AuthEntity } from './database/entities/auth.entity';
import { CacheEntity } from './database/entities/cache.entity';
import { InteractionEntity } from './database/entities/interactions.entity';
import { StatisticsEntity } from './database/entities/statistics.entity';

// Importation de JwtModule
import { JwtModule } from '@nestjs/jwt';
import { InteractionModule } from './interaction/interaction.module';
import { CachesModule } from './caches/caches.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    // Configuration de la base de données
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BASE_URL || 'localhost',
      port: Number(process.env.PORT) || 5432,
      username: process.env.BASE_USERNAME || 'postgres',
      password: process.env.BASE_PASSWORD || '123',
      database: process.env.BASE_NAME || 'SOPRA_STERIA',
      entities: [
        UserEntity,
        AuthEntity,
        CacheEntity,
        InteractionEntity,
        StatisticsEntity
      ],
      synchronize: true, 
    }),

    // Configuration du JwtModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', 
      signOptions: { expiresIn: '60s' }, 
    }),

    // Importation des modules
    AuthModule,
    CachesModule,
    UserModule,
    InteractionModule,
    CachesModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
