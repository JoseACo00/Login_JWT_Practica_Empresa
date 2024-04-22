import { Router } from '@angular/router';
import { LoginService } from './../services/Loggin/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {

  mensaje="El campo es obligatorio"; // ESTO SIRVE PARA LA INTERPOLACIÓN

  constructor(private fb: FormBuilder, private LoginService:LoginService, private router: Router){
    this.FormLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  FormLogin =this.fb.group({
    'email': ['', [Validators.required, Validators.email,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Verifica el formato de correo electrónico
    'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  })

  procesar(){
    console.log(this.FormLogin.value);
  }

  public LogOk(){
    	this.LoginService.Login(this.FormLogin.value)
      .subscribe(
      (response) => {
        console.log('Formulario Enviado:', response);
        // Puedes agregar aquí lógica adicional después de enviar el formulario
      },
      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      },

    ); this.router.navigate(['Inicio']);
  }

  // 1PONES EL TOKENJWT EN EL LOCALSTORAGE PERO NECESITAMOS PONER EL CONSTRUCTOR LAS VARIABLES
  onLogin() {
    this.LoginService.Login(this.FormLogin.value)
      .subscribe(
        (res: any) => {
          if (res.token) {
            // Si el servidor devuelve un token, lo almacenamos en localStorage
            localStorage.setItem('TokenJWT', res.token);
            alert('Inicio de sesión exitoso');
          } else {
            alert('Credenciales inválidas');
          }
        },
        (        error: { message: string; }) => {
          alert('Error en la solicitud: ' + error.message);
        }
      );
  }

  //2. CON FORMBUILDER COMO HICIMOS CON EL CREATE
  public onLogin2() {
    if (this.FormLogin.valid) {
      this.LoginService.Login(this.FormLogin.value)
        .subscribe(
          (res: any) => {
            if (res.token) {
              localStorage.setItem('TokenJWT', res.token);
              alert('Inicio de sesión exitoso');
              this.router.navigate(['/Inicio']); // Redirige a la página principal después del inicio de sesión
            } else {
              alert('Credenciales inválidas');
            }
          },
          (          error: { message: string; }) => {
            alert('Error en la solicitud: ' + error.message);
          }
        );
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  }


}
