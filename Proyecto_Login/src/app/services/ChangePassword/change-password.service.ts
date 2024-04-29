import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  // //URL DEL ENDPOINT
  // url= '/cambiar_password/{token}';

  // public changePassword(token:string, body:any){

  //   return this.http.post(this.url, body);
  // }


  // Definir la URL base del endpoint
  //baseUrl = '/http://localhost:8000/reset-password';

  // Definir la URL base del endpoint en tu backend Symfony
  baseUrl = 'http://localhost:8000';

   // Método para cambiar la contraseña
   public changePassword(token: string, body: any) {
    // Construir la URL completa con el token
    const url = `${this.baseUrl}/reset-password/${token}`;
    // Realizar la solicitud POST a la URL construida
    return this.http.post(url, body);
  }
    // // Método para cambiar la contraseña
    // public changePassword(token: string, body: any) {
    //   // Reemplazar el marcador de posición {token} en la URL con el valor real del token
    //   const url = `${this.baseUrl}/${token}`;
    //   // Realizar la solicitud POST a la URL construida
    //   return this.http.post(url, body);

    // }
}
