import { EmailRequestService } from './../services/ReqstEmail/email-request.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  constructor(private fb: FormBuilder, private EmailRequestService:EmailRequestService, private router: Router, private notifications: NotificationsService ){

  }

  formResetPassword = this.fb.group({
    'email': ['', [Validators.required, Validators.email,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Verifica el formato de correo electrónico
  });

  progresar(){
      console.log(this.formResetPassword.value);
  }

//MENSAJES DE ERROR y Y DE CORRECTO  //ALERTAS

onError(message: string) {
  this.notifications.error('Error Caballero', message, {
    position: ["top", "center"], // Configuración de posición
    animate: 'fromTop',
    showProgressBar: true,
    timeOut: 4000
  });
}

 onSuccess(message: string) {
  this.notifications.success('Correcto con padre', message, {
    position: ['top', 'middle'],
    animate: 'fromRight',
    showProgressBar: true,
    timeOut: 2000
  });
}

//--------------------------------------------

  //ENVIAR LOS EMAILL 01
   RequestEmail() {

    this.EmailRequestService.request_Email(this.formResetPassword.value)
    .subscribe(
      (response) => {
        console.log('El email de recuperación fue enviado al email:', response);
        // Puedes agregar aquí lógica adicional después de enviar el formulario
      },
      (err : any) => {

        console.error('Error al enviar el email:', err);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    );

  }

  // MANERA CORRECTA 02
  RequestEmail1() {
    this.EmailRequestService.request_Email(this.formResetPassword.value)
      .subscribe(
        (response) => {
          this.onSuccess('El email de recuperación fue enviado correctamente:');
          // Puedes agregar aquí lógica adicional después de enviar el formulario
        },
        (error: any) => {
          this.onError(error.error.error);

        }
      );
  }

  // RequestEmail1() {
  //   this.EmailRequestService.request_Email(this.formResetPassword.value)
  //     .subscribe(
  //       (response) => {
  //         this.onSuccess('El email de recuperación fue enviado al email:');
  //         // Puedes agregar aquí lógica adicional después de enviar el formulario
  //       },
  //       (err: any) => {
  //         console.error('Error al enviar el email:', err);
  //         if (err.error instanceof ErrorEvent) {
  //           // Manejar errores del cliente
  //           console.error('Ocurrió un error:', err.error.message);
  //           this.onError(err.error.message); // Mostrar el mensaje de error del cliente
  //         } else if (err.error && err.error.error) {
  //           // El servidor retornó un mensaje de error JSON
  //           console.error(
  //             `El servidor retornó el código ${err.status}: ${err.error.error}`
  //           );
  //           this.onError(err.error.error); // Mostrar el mensaje de error del servidor
  //         } else {
  //           // Otro tipo de error
  //           console.error(
  //             `El servidor retornó el código ${err.status}: ${err.error}`
  //           );
  //           this.onError(`Error desconocido del servidor: ${err.status}`); // Mostrar un mensaje de error genérico
  //         }
  //       }
  //     );
  //   }

}
