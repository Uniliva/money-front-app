import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { CategoriaService } from '../categoria.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { Lancamento } from 'src/app/shared/models/lancamento';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _lacamentoService: LancamentoService,
    private _categoriaService: CategoriaService,
    private _pessoaService: PessoaService,
    private _notificador: NotificacaoService,
    private _utilsService: UtilsService,
    private _rota: Router,
    private _rotaAtual: ActivatedRoute) { }

  formularioLancamento: FormGroup;
  categorias: any;
  pessoas: any;
  titulo = 'Novo lançamento'
  private _modoEdicao = false;
  private _lancamento = new Lancamento();


  ngOnInit(): void {

    this._carregaFormulario();

    let codigo = this._rotaAtual.snapshot.params['id'];

    if (codigo) {
      this._lacamentoService.buscarPorCodigo(codigo)
        .subscribe(lanc => {
          this.titulo = 'Editar lançamento';
          this._modoEdicao = true;
          this._lancamento = lanc;
          this._carregaFormulario();
        });
    }

    this._listaCategorias();
    this._listaPessoas()

  }

  compareFunction(o1: any, o2: any) {
    return (o1?.codigo == o2?.codigo);
  }

  salvar() {
    if (this._modoEdicao) {
      this._atualizarLancamento();
    } else {
      this._salvarLancamento();
    }
  }

  private _salvarLancamento() {
    this._lacamentoService.salvar(this.gerarBody())
      .subscribe(
        () => {
          this._notificador.notificarSucesso("Lançamento salvo com sucesso!")
          this._limparFormulario();
        }
      )
  }


  private _atualizarLancamento() {
    this._lacamentoService.atualizar(this.gerarBody())
      .subscribe(
        () => {
          this._notificador.notificarSucesso("Lançamento atualizado com sucesso!")
          this._limparFormulario();
        }
      )
  }

  private _limparFormulario() {
    this.formularioLancamento.reset();
    Object.keys(this.formularioLancamento.controls).forEach(key => {
      this.formularioLancamento.get(key).setErrors(null);
    });
  }

  private _listaCategorias() {
    this._categoriaService.buscaTodos()
      .subscribe(
        dados => this.categorias = dados
      )
  }


  private _listaPessoas() {
    this._pessoaService.buscaTodos()
      .subscribe(
        dados => this.pessoas = dados
      )
  }

  voltar() {
    this._rota.navigate(['lancamentos']);
  }

  private gerarBody() {
    let form = this.formularioLancamento.value;

    this._lancamento.descricao = form.descricao;
    this._lancamento.dataVencimento = this._utilsService.converteDataComBarra(form.dataVencimento);
    this._lancamento.dataPagamento = this._utilsService.converteDataComBarra(form.dataPagamento);
    this._lancamento.valor = form.valor;
    this._lancamento.observacao = form.observacao;
    this._lancamento.tipo = form.tipo;
    this._lancamento.categoria = form.categoria;
    this._lancamento.pessoa = form.pessoa;

    return this._lancamento;
  }

  private _carregaFormulario() {

    let dataVenc = this._utilsService.converterParaDate(this._lancamento.dataVencimento);
    let dataPag = this._utilsService.converterParaDate(this._lancamento.dataPagamento);

    this.formularioLancamento = this._fb.group({
      tipo: [this._lancamento.tipo || 'RECEITA', null],
      dataVencimento: [dataVenc, Validators.required],
      dataPagamento: [dataPag],
      descricao: [this._lancamento.descricao, [Validators.minLength(5), Validators.required]],
      valor: [this._lancamento.valor, Validators.required],
      categoria: [this._lancamento.categoria, Validators.required],
      pessoa: [this._lancamento.pessoa, Validators.required],
      observacao: [this._lancamento.observacao, null]
    });
  }
}
