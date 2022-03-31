import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  consultar() {
    return this.http.get(environment.domain + environment.apis.consultar)
  }

  almacenar(resultado: string) {
    const body = { resultado: resultado }
    return this.http.post(environment.domain + environment.apis.almacenar, body)
  }

  eliminar() {
    return this.http.delete(environment.domain + environment.apis.eliminar)
  }

}
