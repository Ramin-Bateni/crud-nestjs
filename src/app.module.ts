import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/infrastructure/module';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE_CONFIG } from './common/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANGUAGE_CONFIG(),
      loaderOptions: {
        path: path.join(__dirname, './i18n/localization/lang/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang', 'l']), { use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGODB_URI,
        };
      },
      connectionName: process.env.DATABASE_NAME || 'nestjs_db',
    }),
    CustomerModule,
  ],
})
export class AppModule {}
