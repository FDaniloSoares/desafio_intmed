import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

import { Agendamento } from '../models';
import { HttpUtilService } from  '../../shared/services/http-util.service';

@Injectable()
export class AgendamentoService {
    private readonly PATH: string = 'agendas/';

    constructor(
        private http: HttpClient,
        private httpUtil: HttpUtilService
    ) {}

    agendar(agendamento: Agendamento): Observable<any>{
        return this.http.post(
            env.baseApiURL + this.PATH,
            agendamento,
            this.httpUtil.headers()
        );
    }

    listarAgendas(): Observable<any>{
        console.log('Authorization:', 'JWT ' + localStorage['token'])
        console.log(JSON.stringify((env.baseApiURL + this.PATH, this.httpUtil.headers()))); 
        return this.http.get(
            env.baseApiURL + this.PATH, this.httpUtil.headers()
        );
    }    
}
