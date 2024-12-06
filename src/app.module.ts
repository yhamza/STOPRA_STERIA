import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

// entities importation
import { UserEntity } from './database/entities/user.entity';
import { AuthEntity } from './database/entities/auth.entity';
import { CacheEntity } from './database/entities/cache.entity';
import { InteractionEntity } from './database/entities/interactions.entity';
import { StatisticsEntity } from './database/entities/statistics.entity';

// JwtModule Importation  
import { JwtModule } from '@nestjs/jwt';
import { InteractionModule } from './interaction/interaction.module';
import { CachesModule } from './caches/caches.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    // Data Base Configuration 
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

    // JwtModule Configuration  
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', 
      signOptions: { expiresIn: '60s' }, 
    }),

    // modules Importations 
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
