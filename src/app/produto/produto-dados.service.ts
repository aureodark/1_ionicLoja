import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDadosService {

  private produtoSource = new BehaviorSubject({ produto: null, key: '' });
  currentProduto = this.produtoSource.asObservable();

  constructor() { }

  changeProduto(produto: Produto, key: string) {
    this.produtoSource.next({ produto: produto, key: key });
  }


}
