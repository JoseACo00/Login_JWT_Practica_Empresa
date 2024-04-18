import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {

  mensaje="El campo es obligatorio"; // ESTO SIRVE PARA LA INTERPOLACIÓN 

  constructor(private fb: FormBuilder){}

  FormLogin =this.fb.group({
    'email': ['', [Validators.required, Validators.email,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]], // Verifica el formato de correo electrónico
    'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  })

  procesar(){
    console.log(this.FormLogin.value);
  }
}
