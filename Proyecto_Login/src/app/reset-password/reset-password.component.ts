import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  constructor(private fb: FormBuilder){

  }

  FormChangePassword= this.fb.group({

    'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    'confirmPassword': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  },
  {
    validator: this.validarPassword.bind(this) // Usar bind para mantener el contexto de this
  }
);

  progresar(){
    console.log(this.FormChangePassword.value);
  }

  //VERIFICAR QUE LAS CONTRASEÑAS SE HAN IGUALES

  // public validarPassword(){
  //   return this.FormChangePassword.get('password')?.value==this.FormChangePassword.get('confirmPassword')?.value?
  //   null:
  //   {'missmatch': true}
  //   console.log(this.FormChangePassword.value);
  // }

  public validarPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // Verificar si las contraseñas coinciden
    const coincidenPassword = password === confirmPassword;

    // Si las contraseñas coinciden, mostrar el mensaje de éxito y los valores en la consola
    if (coincidenPassword) {
      console.log('Las contraseñas coinciden:');
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      return null;
    } else {
      // Si las contraseñas no coinciden, mostrar un mensaje de error en la consola
      console.error('Las contraseñas no coinciden:');
      console.error('Password:', password);
      console.error('Confirm Password:', confirmPassword);

      // Devolver un objeto con el error 'coincidenPassword'
      return { 'missmatch': true };
    }
  }

}
