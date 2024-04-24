import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {


  constructor(private router: Router){

  }

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
    this.router.navigate(['/loggin']);
  }
  
}
