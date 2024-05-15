import { Router } from '@angular/router';
import { LoginService } from './../services/Loggin/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { timeout } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {


  mensaje="El campo es obligatorio"; // ESTO SIRVE PARA LA INTERPOLACIÓN

  constructor(private fb: FormBuilder, private LoginService:LoginService, private router: Router, private notifications: NotificationsService, private translate: TranslateService){
    // this.FormLogin = new FormGroup({
    //   email: new FormControl(''),
    //   password: new FormControl(''),
    // });
  }

  FormLogin =this.fb.group({
    'email': ['', [Validators.required, Validators.email,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Verifica el formato de correo electrónico
    'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    'remenberMe' : [ false ]
  })

  procesar(){
    console.log(this.FormLogin.value);
  }

  cambiarIdioma(language: string){
    this.translate.use(language);
  }

  //ALERTAS
  onSuccess(message: string) {
    this.notifications.success('Correcto con padre', message, {
      position: ['top', 'middle'],
      animate: 'fromRight',
      showProgressBar: true,
      timeOut: 2000
    });
  }
  onError(message: string) {
    this.notifications.error('Error con padre', message, {
      position: ["top", "center"], // Configuración de posición
      animate: 'fromTop',
      showProgressBar: true,
      timeOut: 4000
    });
  }



  // public LogOk(){
  //   	this.LoginService.Login(this.FormLogin.value)
  //     .subscribe(
  //     (response) => {
  //       console.log('Formulario Enviado:', response);
  //       // Puedes agregar aquí lógica adicional después de enviar el formulario
  //     },
  //     (error) => {
  //       console.error('Error al enviar el formulario:', error);
  //       // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
  //     },

  //   ); this.router.navigate(['Inicio']);
  // }

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


   //DEPENDIENDO DE SI ESTA MARCADO DEL CHECK BOX SE GUARDA EN LOCAL O SESSION STORAGE SISISSIISIS
   public onLogin021() {
    if (this.FormLogin.valid) {
      const rememberMe = this.FormLogin.get('remenberMe')?.value;
      this.LoginService.Login(this.FormLogin.value)
        .subscribe(
          (res: any) => {
            if (res.token) {
              if (rememberMe) {
                localStorage.setItem('TokenJWT', res.token);
              } else {
                sessionStorage.setItem('TokenJWT', res.token);
              }
              //CAMBIAR POR UN INSTANT LOS ALERTS
              //this.translate.instant(

              //SIEMPRE que sn
              const translation = this.translate.instant('loginAlert.CorrectSession');
              this.onSuccess(translation);
              setTimeout(() => {
                  this.router.navigate(['/Inicio']);
              }, 2000);

              // this.onSuccess('Inicio de sesión exitoso');
              // setTimeout(()=>{this.router.navigate(['/Inicio'])}, 2000); // Redirige a la página principal después del inicio de sesión
            } else {
              const translation = this.translate.instant('loginAlert.BadError');
              this.onError(translation);
          }


          }
          // (error: any) => {
          //   this.onError(error.error.error);
          // }
        );
    } else {
      const translate = this.translate.instant('loginAlert.CompleteAll');
      this.onError(translate);
    }
  }


  //2. CON FORMBUILDER COMO HICIMOS CON EL CREATE SE GUARDA EN SESSIONSOTREAGE
  public onLogin2() {
    if (this.FormLogin.valid) {
      this.LoginService.Login(this.FormLogin.value)
        .subscribe(
          (res: any) => {
            if (res.token) {
              sessionStorage.setItem('TokenJWT', res.token);
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

  //SE GUARDA EN LOCALSTORAGE o SESION STORAGE DEPENDE DEL CHECK BOX QUE TIENE UN  formControlName="remenberMe"
  //FALLO TE LO GUARDA EN LOS 2 PUEDE SER UTIL O NO EL TIEMPO LO DIRÁ
  public onLogin02() {
    if (this.FormLogin.valid) {
      this.LoginService.Login(this.FormLogin.value)
        .subscribe(
          (res: any) => {
            if(this.FormLogin.get('remenberMe')?.value) {
              localStorage.setItem('TokenJWT', res.token);
            }
            if (res.token) {
              sessionStorage.setItem('TokenJWT', res.token);
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
