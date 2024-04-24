import { CreateService } from './../services/create.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent  implements OnInit{

  constructor(private fb: FormBuilder, private CreateService: CreateService, private router :Router, private notifications: NotificationsService) {}

  ngOnInit(): void {

  }

  FormCreate = this.fb.group({
    'name': ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(30)]], // Permite solo letras y espacios
    'email': ['', [Validators.required, Validators.email,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Verifica el formato de correo electrónico
    'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]], // Verifica el formato de
    'phone': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('[0-9]*')]] // Permite solo números
  });

     // Función para procesar el envío del formulario
     //PARA QUE SE VEA EN EL CONSOLA
procesar() {
  console.log(this.FormCreate.value);

}

//ALERTAS
onSuccess(message: string) {
  this.notifications.success('Correcto con padre', message, {
    position: ['bottom', 'right'],
    animate: 'fade',
    showProgressBar: true,
    timeOut: 2000
  });
}
onError(message: string) {
  this.notifications.error('Error con padre', message, {
    position: ["top", "center"], // Configuración de posición
    animate: 'fade',
    showProgressBar: true,
    timeOut: 4000
  });
}

//SE ENVIA DATOSA A LA API
//FUNCION PARA ENVIAR LOS DATOS AL ENDPOINT
//NECESITA ESTAR EL SYMFONY OPEN
//FALLA EL CORSE

public enviarData() {
  this.CreateService.post('http://localhost:8000/usuario_nuevo', this.FormCreate.value)
  .subscribe(respuesta => {
    console.log('Usuario creado');
  })
}

public enviarData2() {
  this.CreateService.createUser(this.FormCreate.value)
    .subscribe(
      (response) => {
        console.log('Formulario Enviado:', response);
        // Puedes agregar aquí lógica adicional después de enviar el formulario
        this.onSuccess('Usuario Creado');
              setTimeout(()=>{this.router.navigate(['/loggin'])}, 3000);
        
      },
      (err : any) => {
       
        this.onError(err.error.error);
        console.error('Error al enviar el formulario:', err);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    ); 
  }
//FUNCION PARA ENVIAR LOS DATOS AL ENDPOINT
//NECESITA ESTAR EL SYMFONY OPEN
//FALLA EL CORSE

// public enviarData() {
//   this.CreateService.post('http://localhost:8000/usuario_nuevo', this.FormCreate.value)
//   .subscribe(respuesta => {
//     console.log('Usuario creado');
//   })
// }


//ASI TAMBIEN FUNCIONA ******
//---------------------------
// public envidarData2(){
//   this.CreateService.saveUserNew(this.FormCreate.value).subscribe((result)=>{
//     console.log(result);
//   })
// }

//---------------------------------------

}
