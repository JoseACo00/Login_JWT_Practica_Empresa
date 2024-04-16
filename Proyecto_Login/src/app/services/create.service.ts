import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  //Obtener la api

  public post(url:string, body:any){
    return this.http.post(url, body);
  }

  url = 'http://localhost:8000/usuario_nuevo'; //el endpoint de la api
  //  metodo2
  //funciona
  public saveUserNew(data:any){
    return this.http.post(this.url,data);
  }

  //METODO3
  public createUser(body:any){

    return this.http.post(this.url,body);

}
}
