import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { Cadastro } from '../';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarService {

  private readonly PATH: string = 'account/create/'

  constructor(private http: HttpClient) { }

  cadastrar(cadastro:Cadastro): Observable<any>{
    return this.http.post(env.baseApiURL + this.PATH, cadastro);
  }
}
