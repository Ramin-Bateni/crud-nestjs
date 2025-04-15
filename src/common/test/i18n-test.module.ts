import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { HeaderResolver } from 'nestjs-i18n';

export const I18nTestModule = I18nModule.forRoot({
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, '../../../i18n/localization/lang/'),
    watch: false,
  },
  resolvers: [
    new HeaderResolver(['x-lang']),
  ],
}); 