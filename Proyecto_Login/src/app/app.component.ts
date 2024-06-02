import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Proyecto_Login';


  //SE LLAMA AL SERVICIO DE TRANSLATE
  constructor(private translate: TranslateService){
    this.translate.setDefaultLang('en');
  }

  //FUNCIÓN PARA ESCOGER EL IDIOMA DESEADO POR LE USER

  switchLanguage(language:string){
    this.translate.use(language);
  }
}
