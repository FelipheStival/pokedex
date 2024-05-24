import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers: HttpHeaders;

  constructor(
    private httpCliente: HttpClient
  ) { 

    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('accept', 'application/json');

  }

  /**
   * Método para obter os dados de uma requisição
   * 
   * @param url url a ser consultado os dados
   * @param params parametros da requisição
   */
  public get(url: string) {

    let urlRequest = `${environment.url}/${url}`;
    let options: any = {
      Headers: this.headers
    }

    return this.httpCliente.get(urlRequest, options);

  }

}
