import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from '../../models';
import { AgendamentoService } from '../../services';
import { HttpUtilService } from '../../../shared';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  especialidade: string
  agendas=[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private httpUtil: HttpUtilService,
    private agendamentoService: AgendamentoService,
  ) { }

  ngOnInit(): void {
 
    this.especialidade = sessionStorage.getItem("especialidade");
    this.gerarForm();
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
  

  gerarForm() {
    this.form = this.fb.group({
      especialidade: ['', [Validators.required]],
      medico:  ['', [Validators.required ]],
      data: ['', [Validators.required ]],
      hora: ['', [Validators.required ]],
    });
  }; 
  
  agendar(){
    if (this.form.invalid){
      return;
    }
    const agendamento: Agendamento = this.form.value;
    //alert(JSON.stringify(agendamento));
  
    this.agendamentoService.agendar(agendamento)
    .subscribe(
      data => {
        const msg: string = "Agendamento Efetuado com Sucesso!!!";
        alert(JSON.stringify(msg));
        this.router.navigate(['/consultas'])
      },
      err => {
        let msg: string = "Tente novamente em Instantes"
        if (err.status == 400){
          msg = err.error.errors.join(' ');
        }
        alert(JSON.stringify(msg));
      } 
    )
  
  };
}

