import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Proyecto_Login';
  hideBanner: boolean = false;

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.setDefaultLang('en');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta actual es la página de inicio o la página de error 404
        this.hideBanner = event.url === '/Inicio' || event.url === '/error404';
      }
    });
  }

  //FUNCIÓN PARA ESCOGER EL IDIOMA DESEADO POR LE USER

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
