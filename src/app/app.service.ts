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

  almacenar(resultado: String) {
    const body = { resultado: resultado }
    console.log(body);
    return this.http.post(environment.domain + environment.apis.almacenar, body)
  }

  eliminar() {
    return this.http.delete(environment.domain + environment.apis.eliminar)
  }

}
