import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cadastro } from '../../models';
import { CadastrarService } from '../../services';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastrarService: CadastrarService,
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }
  
  gerarForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username:  ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  
  cadastrar() {
    if (this.form.invalid){
      return;
    }
    const cadastro: Cadastro = this.form.value
    //alert(JSON.stringify(cadastro));
    this.cadastrarService.cadastrar(cadastro)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          const msg: string = "Realize o login para agendar consultas";
          // substituir por alert de sucesso do Bootstrap
          alert(JSON.stringify(msg));
          this.router.navigate(['/login']);
        },
        err => {
          console.log(JSON.stringify(err));
          let msg: string = "Tente novamente em Instantes";
          if (err.status == 400){
            msg = err.error.errors.join(' ');  
          }
          alert(JSON.stringify(msg));
        }
      );
    return false;
  }
}
