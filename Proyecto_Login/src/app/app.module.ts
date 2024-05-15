import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogginComponent } from './loggin/loggin.component';
import { BannerComponent } from './banner/banner.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotFoundComponent } from './not-found/not-found.component';

//INICIO DE SERVICIOS

export function  httpLoaderFactory(http: HttpClient){
  return new  TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    BannerComponent,
    RegistrarComponent,
    InicioComponent,
    CambiarPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      }
    }),
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
