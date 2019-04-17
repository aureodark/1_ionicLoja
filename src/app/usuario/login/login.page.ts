import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  private uid: string;
  private email: string;
  private pws: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    this.login()
  }

  login() {
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.pws)
      .then(user => {
        console.log(user)
      },
        err => {
          console.log(err);
          this.presentAlert("Aviso", "Usuário não encontrado!");
        }
      ).catch(
        erros => {
          this.presentAlert("Erro no Sistema", "Não foi possível conectar!");
        }
      )
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.uid = null;
  }

  addUser() {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email, this.pws)
      .then(
        ok => {
          this.presentAlert("Aê!", "Por enquanto tá tudo tranquilo");
        },
        err => {
          this.presentAlert("Putz....", "Deu ruim meu brother...  :(");
        }
      )
  }

  loginG() {
      this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        res=>{
          console.log(res);
          this.uid = res.user.uid;
      })
      
  }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: texto,
      buttons: ['Tranks!']
    });

    await alert.present();
  }


}
