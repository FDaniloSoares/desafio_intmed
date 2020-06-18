import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { 
  ListagemComponent, 
  AgendamentoComponent,
  ConsultasComponent, 
} from './components';
import { HttpUtilService } from '../shared';
import { AgendamentoService } from './services';


@NgModule({
  declarations: [
    ListagemComponent, 
    AgendamentoComponent,
    ConsultasComponent,
    
  
  ],
  
    imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    HttpUtilService,
    AgendamentoService
  ]
})
export class ConsultasModule { }
