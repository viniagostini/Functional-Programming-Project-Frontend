import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';


import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile',      component: ProfileComponent },
  { path: '**', component: HomeComponent } // not found
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})

export class AppModule { }
