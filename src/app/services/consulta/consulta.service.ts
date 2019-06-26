import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  postConsulta(consulta: any): Observable<any>{
    let jsonConsulta = JSON.stringify(consulta);
    const consultaUrl = 'http://localhost:3000/consulta';
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(consultaUrl, jsonConsulta, {headers: headers});
  }
}
