import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Produto } from '../produto';
import { ProdutoDadosService } from '../produto-dados.service';
import { Observable } from 'rxjs';


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

  slideNext() {
    this.mySlider.slideNext();
  }

  slidePrev() {
    this.mySlider.slidePrev();
  }











  constructor(
    private route: ActivatedRoute,
    private produtoDataService: ProdutoDadosService,
    private router: Router,
    private produtoService: ProdutoService,
    private alertController: AlertController
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

  delete(key: string) {
    this.produtoService.delete(key);
    this.router.navigate(['/home']);
    this.presentAlert("Aviso", "Excluído com sucesso!");
  }

  edit(produto: Produto, key: string) {
    this.router.navigate(['/cadastro'])
    this.produtoDataService.changeProduto(produto, key);
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('key');
  }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: texto,
      buttons: ['Uhu!']
    });

    await alert.present();
  }
}