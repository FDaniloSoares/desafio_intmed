import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { 
  LoginModule, 
  LoginRoutingModule,
  CadastroModule,
  CadastroRoutingModule
} from './autenticacao';
import { AppRoutingModule } from './app-routing.module';

import {
  ConsultasModule,
  ConsultasRoutingModule,
} from './consultas';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    LoginRoutingModule,
    CadastroModule,
    CadastroRoutingModule,
    ConsultasModule,
    ConsultasRoutingModule,
    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
