import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoadingService } from '../../services/loading';

let pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  //console.log('Request started: ', req.url);

  pendingRequests++;
  loadingService.showLoading();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          //console.log('Request finished: ', req.url);
          handleHideLoading(loadingService);
        }
      },
      error: () => {
        handleHideLoading(loadingService);
      }
    })
  );
};

function handleHideLoading(loadingService: LoadingService) {
  pendingRequests--;
  if (pendingRequests === 0) {
    loadingService.hideLoading();
  }
}
