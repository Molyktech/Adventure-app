import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsStoragePlugin, NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(
[],
withNgxsReduxDevtoolsPlugin(),
withNgxsLoggerPlugin(),
withNgxsStoragePlugin({keys: '*'} as NgxsStoragePluginOptions))]
};
