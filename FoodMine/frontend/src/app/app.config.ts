import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch ,withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './shared/interceptors/loading-interceptor';
import { authInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([loadingInterceptor,authInterceptor])) ,
     provideAnimations(),  
    provideToastr({
      timeOut: 3000,               
      positionClass: 'toast-bottom-right', 
      newestOnTop: false}),
      
  ]
};
