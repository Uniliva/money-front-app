import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { PessoaService } from '../pessoa.service';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { Pessoa } from 'src/app/shared/models/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.css"]
})
export class PessoaCadastroComponent implements OnInit {
  formularioPessoa: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _pessoaService: PessoaService,
    private _notificador: NotificacaoService,
    private _rota: Router) {}

  ngOnInit(): void {
    this.formularioPessoa = this._fb.group({
      nome: [null, [Validators.minLength(10), Validators.required]],
      logradouro: [null, [Validators.minLength(5), Validators.required]],
      numero: [null, Validators.required],
      complemento: [null, null],
      bairro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  salvar() {
    this._pessoaService.salvar(this.gerarBody())
      .subscribe(
        () => {
          this._notificador.notificarSucesso("Pessoa salva com sucesso!")
          this.formularioPessoa.reset();
          Object.keys(this.formularioPessoa.controls).forEach(key => {
            this.formularioPessoa.get(key).setErrors(null) ;
          });
        }
      )
  }

  voltar(){
    this._rota.navigate(['pessoas']);
  }

  private gerarBody() {
    let pessoa: Pessoa = new Pessoa();
    let form = this.formularioPessoa.value;

    pessoa.nome = form.nome;
    pessoa.ativo= true;
    pessoa.endereco.logradouro = form.logradouro;
    pessoa.endereco.numero = form.numero;
    pessoa.endereco.cep = form.cep;
    pessoa.endereco.bairro = form.bairro;
    pessoa.endereco.complemento = form.complemento;
    pessoa.endereco.cidade = form.cidade;
    pessoa.endereco.estado = form.estado;
    return pessoa;
  }
}
