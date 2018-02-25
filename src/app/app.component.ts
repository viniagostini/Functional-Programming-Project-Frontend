import {AfterViewInit, Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';


import {AuthService} from './auth.service';

declare const gapi: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  public isAuthenticated;
  public user;

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) {
    this.isAuthenticated = this.getIsAuthenticated();
    console.log(this.authService.getGoogleAPI());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.renderGoogleAuthButton();
  }

  public renderGoogleAuthButton () {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
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

    this.authService.login(googleUser);

    this.zone.run(() => {
      this.isAuthenticated = true;
    });

    this.user = user;
/*
    this.isAuthenticated = true;

    this.app.tick();*/

    this.router.navigate(['/profile']);
  }


  public getIsAuthenticated () {
    return this.authService.isAuthenticated();
  }

  public logout () {
    this.authService.logout();
    this.isAuthenticated = false; // this.getIsAuthenticated();
  }

}
