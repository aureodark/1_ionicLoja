import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Produto } from '../produto';
import { ProdutoDadosService } from '../produto-dados.service';


import { ProdutoService } from '../produto.service';
import { Router } from "@angular/router";

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  produto: Produto;
  key: string = '';







  @ViewChild('mySlider') mySlider: any;

  elenco = [
    {
      "img": "../../assets/img/1.jpg",
      "posicao": "bala"
    },
    {
      "img": "../../assets/img/2.jpg",
      "posicao": "goma"
    },
    {
      "img": "../../assets/img/3.jpg",
      "posicao": "obama"
    },
  ]

  slideNext() {
    this.mySlider.slideNext();
  }

  slidePrev() {
    this.mySlider.slidePrev();
  }











  constructor(
    private route: ActivatedRoute,
    private produtoDataService: ProdutoDadosService
  ) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if (data.produto && data.key) {
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.descricao = data.produto.descricao;
        this.produto.quant = data.produto.quant;
        this.produto.valor = data.produto.valor;
        this.produto.fotos = data.produto.fotos;
        this.key = data.key;
      }
    })
  }


  getHero(): void {
    const id = this.route.snapshot.paramMap.get('key');
  }
}