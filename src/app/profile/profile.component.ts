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
      const googleUser = authService.getCurrentUser();
      this.http.get('/api/usuario/' + googleUser.id)
        .subscribe(
          (data) => {
          zone.run(() => {
            this.user = data['user'];
          });

        },
        (err) => {
          zone.run(() => {
            this.user = this.googleUserMapper(googleUser);
            console.log(this.user);
          });

          console.log(err);
        });
    }
  }

  ngOnInit() {
  }

  private googleUserMapper (googlerUser) {
    return {
      googleIdentifier: googlerUser.id,
      nome: googlerUser.name,
      email: googlerUser.email
    };
  }

  public cadastrarUsurio (usuario) {
    usuario.matricula = '' + this.matriculaInput;
    this.user = usuario;
    const body = JSON.stringify(usuario);
    console.log(usuario);
    this.http.post('/api/usuario', usuario).subscribe();
  }

}
