import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CadastrarComponent, CadastroComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarService } from './services';


@NgModule({
  declarations: [
    CadastrarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers:[
    CadastrarService,
  ]
})
export class CadastroModule { }
