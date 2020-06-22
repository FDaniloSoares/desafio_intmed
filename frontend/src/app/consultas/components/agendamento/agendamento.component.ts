import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from '../../models';
import { AgendamentoService } from '../../services';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  aux=[];
  agendas=[];
  especialidades=[];
  escolha_especialidade: string;
  medicos=[];
  escolha_medico: string
  dias=[];
  escolha_dia:string;
  horas=[];
  agenda_id: number;
  horario: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private agendamentoService: AgendamentoService,
  ) { }

  ngOnInit(): void {
 
    this.gerarForm();
    this.agendamentoService.listarAgendas()
      .subscribe(
        data => {
          this.agendas = (data["results"]);
          for (var i = 0; i < this.agendas.length; i++) {
            this.aux.push(this.agendas[i].medico.especialidade.nome);  
          }
      
          this.especialidades = this.uniq(this.aux);
          this.aux = [];
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
      horario: ['', [Validators.required ]],
    });
  }; 
  
  agendar(){
    if (this.form.invalid){
      return;
    }
    
    const agendamento: Agendamento = {
        agenda_id: this.agenda_id, 
        horario: this.form.value.horario 
    };
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
          alert(JSON.stringify('Horario não disponivel'));
        }
        alert(JSON.stringify('Tente Mais Tarde em Instantes'));
      } 
    )
  
  };
  uniq(a) {
    var seen = {};
    return a.sort().filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
  selec1(){ 
    this.escolha_especialidade = (<HTMLInputElement>document.getElementById('primeiro')).value;
    
    for (var i = 0; i < this.agendas.length; i++) {
        if (
          this.agendas[i].medico.especialidade.nome == this.escolha_especialidade
          ){
          this.aux.push(this.agendas[i].medico.nome);    
        }  
    }
    this.medicos = this.uniq(this.aux);
    this.aux = [];
  }

  selec2(){ 
    this.escolha_medico = (<HTMLInputElement>document.getElementById('segundo')).value;
    
    for (var i = 0; i < this.agendas.length; i++) {
        if (
          this.agendas[i].medico.nome == this.escolha_medico &&
          this.agendas[i].medico.especialidade.nome == this.escolha_especialidade
          ){
          this.aux.push(this.agendas[i].dia);    
        }  
    }
    this.dias = this.uniq(this.aux);
    this.aux = [];
  }

  selec3(){ 
    this.escolha_dia = (<HTMLInputElement>document.getElementById('terceiro')).value;
    
    for (var i = 0; i < this.agendas.length; i++) {
        if (
          this.agendas[i].medico.nome == this.escolha_medico &&
          this.agendas[i].medico.especialidade.nome == this.escolha_especialidade &&
          this.agendas[i].dia == this.escolha_dia
          ){
          this.aux.push(this.agendas[i].horarios);    
          this.agenda_id = this.agendas[i].id  
        }  
    }
    this.horas = this.uniq(this.aux);    
    this.aux = [];
    this.aux = this.horas[0].split(', ');
    this.horas = this.aux
    this.aux = [];
  }
  selec4(){ 
    this.horario = (<HTMLInputElement>document.getElementById('quarto')).value;
  }  

}


