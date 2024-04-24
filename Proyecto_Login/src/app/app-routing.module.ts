import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LogginComponent } from './loggin/loggin.component';
import { InicioComponent } from './inicio/inicio.component';
import { LogginGuard } from './guards/login-guard.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
const routes: Routes = [
  {path: "", component
  : LogginComponent,
},
  {path:"registrar", component: RegistrarComponent},
  {path: "loggin", component: LogginComponent},
  {path: "Inicio",
  component: InicioComponent,
  canActivate : [LogginGuard]
},
  {path: "reset-password", component : ResetPasswordComponent},
  {path: "cambiar-password", component : CambiarPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
