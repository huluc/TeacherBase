import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    if (authService.isAuthenticated) {
      let authRequest = req.clone(
        { headers: req.headers.set('authorization', 'token ' + authService.token) })
      return next.handle(authRequest);
    }
    else {
      return next.handle(req)
    }

  }




}
