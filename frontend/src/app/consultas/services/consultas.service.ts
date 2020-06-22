import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

import { Agendamento } from '../models';
import { HttpUtilService } from  '../../shared/services/http-util.service';

@Injectable()
export class AgendamentoService {
    
    private readonly PATH_AGENDAS: string = 'agendas/';
    private readonly PATH_CONSULTAS: string = 'consultas/';
    
    constructor(
        private http: HttpClient,
        private httpUtil: HttpUtilService
    ) {}

    agendar(agendamento: Agendamento): Observable<any>{
        return this.http.post(
            env.baseApiURL + this.PATH_CONSULTAS,
            agendamento,
            this.httpUtil.headers()
        );
    }

    listarAgendas(): Observable<any>{
        return this.http.get(
            env.baseApiURL + this.PATH_AGENDAS, this.httpUtil.headers()
        );
    }    

    listarConsultas(): Observable<any>{
        return this.http.get(
            env.baseApiURL + this.PATH_CONSULTAS, this.httpUtil.headers()
        );
    }

    deletarConsultas( consulta_id: string): Observable<any> {
        console.log(env.baseApiURL + this.PATH_CONSULTAS + consulta_id)
        return this.http.delete(env.baseApiURL + this.PATH_CONSULTAS + consulta_id,
         this.httpUtil.headers());
        
    }
}