import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogginComponent } from './loggin/loggin.component';
import { BannerComponent } from './banner/banner.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

//INICIO DE SERVICIOS


@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    BannerComponent,
    RegistrarComponent,
    InicioComponent,
    CambiarPasswordComponent,
    ResetPasswordComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot()
    


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
