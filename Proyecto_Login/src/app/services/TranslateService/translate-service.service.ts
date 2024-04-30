import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class TranslateServiceService {

  constructor(private translate: TranslateService) { }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
