import { ApplicationConfig } from '@angular/core';
import {LuxonDateAdapter} from "@angular/material-luxon-adapter";

import {PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading} from '@angular/router';
import { appRoutes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      ),
    // Material Date Adapter
    {
      provide : DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide : MAT_DATE_FORMATS,
      useValue: {
        parse  : {
          dateInput: 'D',
        },
        display: {
          dateInput         : 'DDD',
          monthYearLabel    : 'LLL yyyy',
          dateA11yLabel     : 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },
  ],
};
