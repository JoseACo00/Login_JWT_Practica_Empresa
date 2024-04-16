import { CreateService } from './../services/create.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent  implements OnInit{

  constructor(private fb: FormBuilder, private CreateService: CreateService, private router :Router ) {}

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


}
