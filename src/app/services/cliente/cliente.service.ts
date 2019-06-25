import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getCliente(cc: string): Observable<any> {
    const clienteIdUrl = `http://localhost:3000/clientes/${cc}`;
    return this.http.get(clienteIdUrl);
  }

  postCliente(cliente: any): Observable<any> {
    let jsonCliente = JSON.stringify(cliente);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const clienteUrl = 'http://localhost:3000/clientes';
    return this.http.post(clienteUrl, jsonCliente, {headers : headers});
  }

}
