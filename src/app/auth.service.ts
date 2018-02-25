import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';


declare const gapi: any;

@Injectable()
export class AuthService {

  private IS_AUTH_KEY = 'isAuthenticated';
  private currentUser;

  constructor(private http: HttpClient) {
    this.loadGAPI();
  }

  public loadGAPI () {
    let ret;

    gapi.load('auth2', function () {
      ret = gapi.auth2.init({
        hosted_domain: 'ccc.ufcg.edu.br'
      });
    });

    return ret;
  }

  public getGoogleAPI () {
    return this.loadGAPI();
  }

  public isAuthenticated () {
    const isAuth = localStorage.getItem(this.IS_AUTH_KEY) === 'true';
    return isAuth;
  }

  public login (googleUser) {
    this.currentUser = this.getGoogleUser(googleUser);
    localStorage.setItem(this.IS_AUTH_KEY, 'true');
  }

  public logout () {
    localStorage.setItem(this.IS_AUTH_KEY, 'false');
    gapi.auth2.getAuthInstance().disconnect();
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  private getGoogleUser(googleUser) {
    const user = {
      id: '',
      name: '',
      email: '',
      imageUrl: '',
      givenName: '',
      familyName: '',
      token: ''
    };

    ((u, p) => {
      u.id = p.getId();
      u.name = p.getName();
      u.email = p.getEmail();
      u.imageUrl = p.getImageUrl();
      u.givenName = p.getGivenName();
      u.familyName = p.getFamilyName();
    })(user, googleUser.getBasicProfile());

    ((u, r) => {
      u.token = r.id_token;
    })(user, googleUser.getAuthResponse());

    return user;
  }

  public getToken() {
    return gapi.auth2 && gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
  }

}
