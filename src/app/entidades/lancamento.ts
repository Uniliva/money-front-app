import { Pessoa } from './pessoa';

export class Lancamento {
  tipo: string;
  dataVencimento: Date;
  dataRecebimento: Date;
  descricao: string;
  categoria: string;
  valor: number;
  pessoa: Pessoa;
  observacao: string;
}
