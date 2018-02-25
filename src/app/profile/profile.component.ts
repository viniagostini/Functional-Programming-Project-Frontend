import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {AuthService} from '../auth.service';

declare const gapi: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {};

  constructor(private authService: AuthService, private zone: NgZone, private http: HttpClient) {
    if (this.authService.isAuthenticated()) {

      this.http.get('/api/profile')
        .subscribe(
          (data) => {
            zone.run(() => {
              console.log(data);
              this.user = data;
            });
          },
          err => console.log(err)
        );
    }
  }

  ngOnInit() {
  }

}
