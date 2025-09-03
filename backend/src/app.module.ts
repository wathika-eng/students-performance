import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      port: process.env.port ? parseInt(process.env.port, 10) : 3306,
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
