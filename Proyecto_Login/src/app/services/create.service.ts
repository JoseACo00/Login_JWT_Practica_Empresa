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
}
