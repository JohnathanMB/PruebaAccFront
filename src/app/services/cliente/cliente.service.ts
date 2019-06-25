import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from "util";

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

  setUser(cc): void {
    let user_string = JSON.stringify(cc);
    localStorage.setItem("currentUser", user_string);
  }

  getCurrentUser() {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let cc = JSON.parse(user_string);
      return cc;
    } else {
      return null;
    }
  }

  logoutUser() {
    localStorage.removeItem("currentUser");
  }

}
