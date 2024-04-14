import {APP_INITIALIZER, ApplicationConfig, inject} from '@angular/core';
import {LuxonDateAdapter} from "@angular/material-luxon-adapter";

import {PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading} from '@angular/router';
import { appRoutes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {TranslocoHttpLoader} from "./core/transloco/transloco.http-loader";
import {provideTransloco, TranslocoService} from "@ngneat/transloco";
import {firstValueFrom} from "rxjs";
import {provideFort} from "../@fortmesh";
import {mockApiServices} from "app/mock-api";


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

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs      : [
          {
            id   : 'en',
            label: 'English',
          },
          {
            id   : 'pt',
            label: 'Portugal',
          },
        ],
        defaultLang         : 'en',
        fallbackLang        : 'en',
        reRenderOnLangChange: true,
        prodMode            : true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide   : APP_INITIALIZER,
      useFactory: () =>
      {
        const translocoService = inject(TranslocoService);
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);

        return () => firstValueFrom(translocoService.load(defaultLang));
      },
      multi     : true,
    },

    // Fort
/*    provideAuth(),
    provideIcons(),*/
    provideFort({
      mockApi: {
        delay   : 0,
        services: mockApiServices,
      },
      fort   : {
        layout : 'empty',
        scheme : 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme  : 'theme-default',
        themes : [
          {
            id  : 'theme-default',
            name: 'Default',
          },
          {
            id  : 'theme-brand',
            name: 'Brand',
          },
          {
            id  : 'theme-teal',
            name: 'Teal',
          },
          {
            id  : 'theme-rose',
            name: 'Rose',
          },
          {
            id  : 'theme-purple',
            name: 'Purple',
          },
          {
            id  : 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  /********/
  ],
};
