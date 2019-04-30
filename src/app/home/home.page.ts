import { Component } from '@angular/core';
import { Produto } from '../produto/produto'
import { Observable } from 'rxjs';
import { ProdutoService } from '../produto/produto.service';
import { Router } from '@angular/router';
import { ProdutoDadosService } from '../produto/produto-dados.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  produtos: Observable<any>;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private produtoDataService: ProdutoDadosService
  ) { }

  ngOnInit() {
    this.produtos = this.produtoService.getAll();
  }
  edit(produto: Produto, key: string) {
    this.router.navigate(['/perfilP'])
    this.produtoDataService.changeProduto(produto, key);
  }

}