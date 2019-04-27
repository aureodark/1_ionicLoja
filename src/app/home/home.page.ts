import { Component } from '@angular/core';
import { Produto } from '../produto/produto'
import { Observable } from 'rxjs';
import { ProdutoService } from '../produto/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  produto: Observable<any>;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.produto = this.produtoService.getAll();
  }
}