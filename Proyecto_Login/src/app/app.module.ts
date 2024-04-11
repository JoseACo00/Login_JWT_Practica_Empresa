import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogginComponent } from './loggin/loggin.component';
import { BannerComponent } from './banner/banner.component';


//INICIO DE SERVICIOS

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    BannerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  

  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
