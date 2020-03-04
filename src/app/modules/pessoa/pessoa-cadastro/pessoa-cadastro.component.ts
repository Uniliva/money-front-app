import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { PessoaService } from "../pessoa.service";
import { NotificacaoService } from "src/app/core/services/notificacao.service";
import { Pessoa } from "src/app/shared/models/pessoa";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.css"]
})
export class PessoaCadastroComponent implements OnInit {
  formularioPessoa: FormGroup;
  titulo: string;
  _modoEdicao: boolean = false;
  _pessoa: Pessoa= new Pessoa;

  customPatterns = { '0': { pattern: new RegExp('\[0-9\]')} };

  constructor(
    private _fb: FormBuilder,
    private _pessoaService: PessoaService,
    private _notificador: NotificacaoService,
    private _rota: Router,
    private _rotaAtual: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titulo = "Nova Pessoa";

    this._carregarFormulario(null);

    let codigo = this._rotaAtual.snapshot.params['id'];

    if (codigo) {
      this._pessoaService.buscaPorCodigo(codigo).subscribe(pessoa => {
        this._pessoa = pessoa;
        this._carregarFormulario(pessoa);
        this.titulo = "Editar Pessoa";
        this._modoEdicao = true;
      });
    }
  }

  salvar() {
    if (this._modoEdicao) {
      this._atualizarPessoa();
    } else {
      this._salvarPessoa();
    }
  }

  private _salvarPessoa() {
    this._pessoaService.salvar(this._gerarBody()).subscribe(() => {
      this._notificador.notificarSucesso("Pessoa salva com sucesso!");
      this._limparFormulario();
    });
  }

  private _atualizarPessoa() {
    this._pessoaService.atualizar(this._gerarBody()).subscribe(() => {
      this._notificador.notificarSucesso(`Dados de ${this._pessoa.nome} atualizados  com sucesso!`);
      this._limparFormulario();
      this.voltar();
    });
  }

  voltar() {
    this._rota.navigate(["pessoas"]);
  }

  private _limparFormulario() {
    this._pessoa = new Pessoa();
    this.formularioPessoa.reset();
    Object.keys(this.formularioPessoa.controls).forEach(key => {
      this.formularioPessoa.get(key).setErrors(null);
    });
  }

  private _gerarBody() {
    let form = this.formularioPessoa.value;

    this._pessoa.nome = form.nome;
    this._pessoa.ativo = true;
    this._pessoa.endereco.logradouro = form.logradouro;
    this._pessoa.endereco.numero = form.numero;
    this._pessoa.endereco.cep = form.cep;
    this._pessoa.endereco.bairro = form.bairro;
    this._pessoa.endereco.complemento = form.complemento;
    this._pessoa.endereco.cidade = form.cidade;
    this._pessoa.endereco.estado = form.estado;

    return this._pessoa;
  }

  private _carregarFormulario(pessoa: Pessoa) {

    this.formularioPessoa = this._fb.group({
      nome: [pessoa?.nome, [Validators.minLength(10), Validators.required]],
      logradouro: [
        pessoa?.endereco.logradouro,
        [Validators.minLength(5), Validators.required]
      ],
      numero: [pessoa?.endereco?.numero, Validators.required],
      complemento: [pessoa?.endereco?.complemento],
      bairro: [pessoa?.endereco?.bairro, Validators.required],
      cep: [pessoa?.endereco?.cep, Validators.required],
      cidade: [pessoa?.endereco?.cidade, Validators.required],
      estado: [pessoa?.endereco?.estado, Validators.required]
    });
  }
}
