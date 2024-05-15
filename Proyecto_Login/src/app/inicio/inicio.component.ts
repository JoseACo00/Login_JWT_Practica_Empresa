
import { animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { TranslateServiceService } from '../services/TranslateService/translate-service.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {


  constructor(private router: Router, private notifications: NotificationsService, private translateService: TranslateServiceService){

  }

  //DESLOGUEARSE
//-----------------------------------------------------------------
  //LOG OUT SENCILLLO
  public logOut(){
   sessionStorage.removeItem('TokenJWT',)
   this.router.navigate(['/loggin']);

  }

  //log out mejorado
  public logOut2() {
    const tokenJWT = sessionStorage.getItem('TokenJWT') || localStorage.getItem('TokenJWT');
    if (tokenJWT) {
      if (sessionStorage.getItem('TokenJWT')) {
        sessionStorage.removeItem('TokenJWT');
      } else {
        localStorage.removeItem('TokenJWT');
      }
    }
    this.onLogOut('Se ha cerrado la sesion')
    this.router.navigate(['/loggin']);
  }
//-----------------------------------------------------------------

cambiarIdioma(language: string){
  this.translateService.switchLanguage(language);
}

// MENSAJES DE ERROR
//-----------------------------------------------------------------

onLogOut(message: string) {
this.notifications.alert('Aviso Comprade',message), {
  position: ['bottom', 'right'],
  animate: 'fromTop',
  showProgressBar: true,
  timeOut: 4000
}
}



//----------------------------------------------------------------
}
