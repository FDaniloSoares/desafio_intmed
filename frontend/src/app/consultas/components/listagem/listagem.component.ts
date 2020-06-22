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
  
  usuario : string;
  consultas=[];
  consulta_id: string;

  constructor(
    private agendamentoService: AgendamentoService ,
    private logoutService: LogoutService,
    private router: Router,
    private httpUtil: HttpUtilService,
    ) { }
  

  ngOnInit(): void {
    
    this.usuario = this.httpUtil.obterNomeUsuario()
    this.agendamentoService.listarConsultas()
      .subscribe(
        data => {
          this.consultas = data
        },
        err => {
          if (err['status']==403) {
            const msg: string = "Não Autorizado";
            alert(msg);
          } else {
            const msg: string = "Erro obtendo Consultas";
            alert(msg);
          }
        }
      )
  }

  logout(){
    this.logoutService.logout();
    this.router.navigate(['/login']);
    }

  deleteConsulta(consulta_id: number){
    this.consulta_id = consulta_id.toString();
    this.agendamentoService.deletarConsultas(this.consulta_id).subscribe();
    history.go(0);
  }

}
