import { Pessoa } from './pessoa';

export class Lancamento {
  descricao: string;
  dataVencimento: string;
  dataPagamento: string;
  valor: number;
  observacao: string;
  tipo: string;
  categoria: string;
  pessoa: Pessoa;
}
