import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';


declare const gapi: any;

@Injectable()
export class AuthService {

  private IS_AUTH_KEY = 'isAuthenticated';
  private currentUser;
  private validHostedDomains = ['ccc.ufcg.edu.br', 'computacao.ufcg.edu.br'];

  constructor(private http: HttpClient) {
    this.loadGAPI();
  }

  public loadGAPI () {
    let ret;

    gapi.load('auth2', function () {
      ret = gapi.auth2.init({
        // hosted_domain: 'ccc.ufcg.edu.br'
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

  public login (user) {
    this.currentUser = user;
    console.log(this.getCurrentUser());
    localStorage.setItem(this.IS_AUTH_KEY, 'true');
  }

  public logout () {
    localStorage.setItem(this.IS_AUTH_KEY, 'false');
    gapi.auth2.getAuthInstance().disconnect();
  }

  public getCurrentUser() {

    if (!gapi.auth2) {
      return;
    }

    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();

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
      u.id            = p.getId();
      u.name          = p.getName();
      u.email         = p.getEmail();
      u.imageUrl      = p.getImageUrl();
      u.givenName     = p.getGivenName();
      u.familyName    = p.getFamilyName();
    })(user, googleUser.getBasicProfile());

    ((u, r) => {
      u.token         = r.id_token;
    })(user, googleUser.getAuthResponse());

    return user;
  }

  public getToken() {
    return gapi.auth2 && gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  }

  public isHostedDomainValid(email) {
    let isValid = false;
    this.validHostedDomains.map((domain) => {
      if (email.split('@')[1] === domain) {
        isValid = true;
      }
    });
    return isValid;
  }

}
