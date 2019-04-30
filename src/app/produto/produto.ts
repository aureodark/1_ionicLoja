export class Produto {
  id: number;
  nome: string;
  descricao: string;
  quant: number = 0;
  valor: number;
  ativo: boolean = true;
  fotos: string[] = [];
}