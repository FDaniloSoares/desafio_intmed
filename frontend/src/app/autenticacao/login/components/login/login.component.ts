import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../../models';
import { LoginService } from '../../services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  
    ) { }

  ngOnInit() {
    this.gerarForm();
  }
  
  gerarForm(){
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }  
  
  logar(){
    if (this.form.invalid){
      return;
    }
    
    const login:Login = this.form.value;
    this.loginService.logar(login)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          const usuario = JSON.parse(
            atob(data['access'].split('.')[1]));
          console.log(JSON.stringify(usuario));
          localStorage['token']=data['access']
          //alert('Direcionar para pagina de Consultas');
          this.router.navigate(['/consultas']);
        },
        err => {

          console.log(JSON.stringify(err));
          let msg: string = "Tente novamente em Instantes";
          if (err['status']==401) {
            msg = "Login/Senha invalido(s)"
          }
          alert(msg);
        }

      );
  }

}

