import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  formularioLancamento: FormGroup;

  categorias = ['Compra', 'Venda', 'Aluguel'];

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ]

  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {

    this.formularioLancamento = this.fb.group({
        tipo: ['Receita' , null],
        dataVencimento : [ null , Validators.required],
        data2 : [ null , Validators.required],
        descricao : [ null , [Validators.minLength(5), Validators.required]],
        valor : [ null , Validators.required],
        categoria : [ null , Validators.required],
        pessoa : [ null , Validators.required],
        observacao : [ null , null]
    });
  }


  salvar() {
    // this.formularioLancamento.value  Para passar o valores

  }

  log(item:any){
    console.log(item);

  }
}
