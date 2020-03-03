import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { CategoriaService } from '../categoria.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { Lancamento } from 'src/app/shared/models/lancamento';
import { UtilsService } from 'src/app/core/services/utils.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _lacamentoService: LancamentoService,
    private _categoriaService: CategoriaService,
    private _pessoaService: PessoaService,
    private _notificador: NotificacaoService,
    private _utilsService: UtilsService) { }

  formularioLancamento: FormGroup;
  categorias: any;
  pessoas: any;


  ngOnInit(): void {
    this.carregaFormulario();
    this.listaCategorias();
    this.listaPessoas()
  }


  salvar() {
    this._lacamentoService.salvar(this.gerarBody())
      .subscribe(
        () => {
          this._notificador.notificarSucesso("Lançamento salvo com sucesso!")
          this.formularioLancamento.reset();
          Object.keys(this.formularioLancamento.controls).forEach(key => {
            this.formularioLancamento.get(key).setErrors(null) ;
          });
        }
      )
  }

  listaCategorias() {
    this._categoriaService.buscaTodos()
      .subscribe(
        dados => this.categorias = dados
      )
  }


  listaPessoas() {
    this._pessoaService.buscaTodos()
      .subscribe(
        dados => this.pessoas = dados
      )
  }

  carregaFormulario(){
    this.formularioLancamento = this.fb.group({
      tipo: ['RECEITA', null],
      dataVencimento: [null, Validators.required],
      dataPagamento: [null, Validators.required],
      descricao: [null, [Validators.minLength(5), Validators.required]],
      valor: [null, Validators.required],
      categoria: [null, Validators.required],
      pessoa: [null, Validators.required],
      observacao: [null, null]
    });
  }

  private gerarBody() {
    let lancamento: Lancamento = new Lancamento()
    let form = this.formularioLancamento.value;

    lancamento.descricao = form.descricao;
    lancamento.dataVencimento =  this._utilsService.converteDataComBarra(form.dataVencimento);
    lancamento.dataPagamento =  this._utilsService.converteDataComBarra(form.dataPagamento);
    lancamento.valor = form.valor;
    lancamento.observacao = form.observacao;
    lancamento.tipo = form.tipo;
    lancamento.categoria = form.categoria;
    lancamento.pessoa = form.pessoa;

    return lancamento;
  }
}
