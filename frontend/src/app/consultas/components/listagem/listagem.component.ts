import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendamentoService } from '../../services';
import { LogoutService } from '../../../shared';
import { Router } from '@angular/router';
import { HttpUtilService } from '../../../shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  
  agendas=[];
  usuario : string;

  constructor(
    private agendamentoService: AgendamentoService ,
    private logoutService: LogoutService,
    private router: Router,
    private httpUtil: HttpUtilService,
    ) { }
  

  ngOnInit(): void {
    this.usuario = this.httpUtil.obterNomeUsuario()
    this.agendamentoService.listarAgendas()
      .subscribe(
        data => {
          this.agendas = (data["results"]);
          //console.log((this.agendas));
        },
        err => {
          if (err['status']==403) {
            const msg: string = "Não Autorizado";
            alert(msg);
          } else {
            const msg: string = "Erro obtendo Agendas";
            alert(msg);
          }
        }
      )
  }

  logout(){
    this.logoutService.logout();
    this.router.navigate(['/login']);
    }
}
