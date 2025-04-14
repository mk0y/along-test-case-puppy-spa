import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppiesModule } from './puppies/puppies.module';
import { WaitingListModule } from './waiting-list/waiting-list.module';
import { WaitingListEntryModule } from './waiting-list-entry/waiting-list-entry.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      graphiql: true,
      sortSchema: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: true,
    }),
    PuppiesModule,
    WaitingListModule,
    WaitingListEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
