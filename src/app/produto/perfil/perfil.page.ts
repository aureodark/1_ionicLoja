import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getHero();
  }


  getHero(): void {
    const id = this.route.snapshot.paramMap.get('key');
  }
}