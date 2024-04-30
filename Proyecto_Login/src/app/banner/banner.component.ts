import { Component } from '@angular/core';
import { TranslateServiceService } from '../services/TranslateService/translate-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  constructor(private translateService: TranslateServiceService){

  }
  cambiarIdioma(language: string) {
    this.translateService.switchLanguage(language);
  }
}
