import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const isDevelopment =
          configService.getOrThrow<string>('NODE_ENV') === 'development';
        return {
          type: 'postgres',
          host:
            configService.getOrThrow<string>('POSTGRES_HOST') || 'localhost',
          port: configService.getOrThrow<number>('POSTGRES_PORT') || 5432,
          username:
            configService.getOrThrow<string>('POSTGRES_USER') || 'postgres',
          database:
            configService.getOrThrow<string>('POSTGRES_DB') || 'postgres',
          password:
            configService.getOrThrow<string>('POSTGRES_PASSWORD') || 'root',
          autoLoadEntities: true,
          synchronize: isDevelopment,
          logging: isDevelopment,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
