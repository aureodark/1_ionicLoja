import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProdutoDadosService } from '../produto-dados.service';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  produto: Produto;
  key: string;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private camera: Camera,
    private produtoDataService: ProdutoDadosService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if (data.produto && data.key ){
        this.key = data.key;
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.descricao = data.produto.descricao;
        this.produto.quant = data.produto.quant;
        this.produto.valor = data.produto.valor;
      }
    })
  }

  onSubmit() {
    if (this.key) {
      this.produtoService.update(this.produto, this.key);
      this.presentAlert("Aviso", "Atualizado com sucesso!");
      this.produto = new Produto();
    } else {
      this.produtoService.insert(this.produto);
      this.presentAlert("Aviso", "Cadastrado com sucesso!");
    }
    this.router.navigate(["/"]);
    this.produto = new Produto();
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.produto.fotos.push(base64Image);
      console.log(this.produto.fotos);
    }, (err) => {
      // Handle error
    });
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