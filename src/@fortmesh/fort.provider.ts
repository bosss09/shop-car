import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom, inject,
  Provider
} from "@angular/core";
import {MATERIAL_SANITY_CHECKS} from "@angular/material/core";
import {FORT_MOCK_API_DEFAULT_DELAY, mockApiInterceptor} from "@fortmesh/lib/mock-api";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {FortConfig} from "@fortmesh/services/config";
import {FORT_CONFIG} from "@fortmesh/services/config/config.constants";
import {MatDialogModule} from "@angular/material/dialog";
import {FortConfirmationService} from "./services/confirmation";
import {fortLoadingInterceptor, FortLoadingService} from "./services/loading";
import {FortMediaWatcherService} from "@fortmesh/services/media-watcher";
import {FortPlatformService} from "@fortmesh/services/platform";
import {FortUtilsService} from "@fortmesh/services/utils/utils.service";

export type FortProviderConfig = {
  mockApi?: {
    delay?: number;
    services?: any[];
  },
  fort?: FortConfig
}
/**
 * Fort provider
 */
export const provideFort = (config: FortProviderConfig): Array<Provider | EnvironmentProviders> =>
{
  // Base providers
  const providers: Array<Provider | EnvironmentProviders> = [
    {
      // Disable 'theme' sanity check
      provide : MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme  : false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
    {
      provide : FORT_MOCK_API_DEFAULT_DELAY,
      useValue: config?.mockApi?.delay ?? 0,
    },
    {
      provide : FORT_CONFIG,
      useValue: config?.fort ?? {},
    },

    importProvidersFrom(MatDialogModule),
    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortConfirmationService),
      multi   : true,
    },

    provideHttpClient(withInterceptors([fortLoadingInterceptor])),
    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortLoadingService),
      multi   : true,
    },

    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortMediaWatcherService),
      multi   : true,
    },
    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortPlatformService),
      multi   : true,
    },
 /*   {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortSplashScreenService),
      multi   : true,
    },*/
    {
      provide : ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FortUtilsService),
      multi   : true,
    },
  ];

  // Mock Api services
  if ( config?.mockApi?.services )
  {
    providers.push(
      provideHttpClient(withInterceptors([mockApiInterceptor])),
      {
        provide   : APP_INITIALIZER,
        deps      : [...config.mockApi.services],
        useFactory: () => (): any => null,
        multi     : true,
      },
    );
  }

  // Return the providers
  return providers;
}
