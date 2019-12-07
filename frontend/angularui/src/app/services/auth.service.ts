import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { RegisterUser } from '../register/registerUser';
import { LoginUser } from '../login/loginUser'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  path = environment.path + '/user'
  TOKEN_KEY = "token"

  register(registerUser: RegisterUser) {
    return this.http.post(this.path + '/register', registerUser).subscribe()
  }
  login(loginUser: LoginUser) {
    return this.http.post(this.path + '/login', loginUser).subscribe((data) => this.saveToken(data["token"]))
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY)
  }

  get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY)
  }
}
