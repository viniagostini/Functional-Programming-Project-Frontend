import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {};
  public matriculaInput;

  constructor(private authService: AuthService, private zone: NgZone, private http: HttpClient) {
    if (this.authService.isAuthenticated()) {
      let googleUser = authService.getCurrentUser();
      this.http.get('/api/profile/' + googleUser.id)
        .subscribe(
          (data) => {

          zone.run(() => {
            this.user = data;
          });

        },
        (err) => {
          zone.run(() => {
            this.user = this.googleUserMapper(googleUser);
            console.log(this.user);
          });

          console.log(err)
        });
    }
  }

  ngOnInit() {
  }

  private googleUserMapper (googlerUser) {
    return {
      Userid: googlerUser.id,
      nome: googlerUser.name,
      email: googlerUser.email
    };
  }

  public cadastrarUsurio (usuario) {
    usuario.matricula = this.matriculaInput;
    this.user = usuario;
    let body = JSON.stringify(usuario);
    this.http.post('/api/profile', body).subscribe();
  }

}
