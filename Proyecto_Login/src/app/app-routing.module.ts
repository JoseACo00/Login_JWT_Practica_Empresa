import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LogginComponent } from './loggin/loggin.component';

const routes: Routes = [
  {path: "", component : LogginComponent},
  {path:"registrar", component: RegistrarComponent},
  {path: "loggin", component: LogginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
