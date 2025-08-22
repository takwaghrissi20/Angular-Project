import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
import { inject} from '@angular/core'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUser?.token) {
    return true;
  }

  // Rediriger vers login avec returnUrl
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
