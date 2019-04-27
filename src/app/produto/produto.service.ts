import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Produto } from "./produto";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFireDatabase) { }

  getProduto(id: string) {
    this.db.list('/items', ref => ref.orderByChild('key').equalTo(id)).valueChanges().pipe();
  }

  insert(produto: Produto) {
    this.db
      .list("produto")
      .push(produto)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  getAll() {
    return this.db
      .list("produto")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`produto/${key}`).remove();
  }

  update(produto: Produto, key: string) {
    this.db
      .list("produto")
      .update(key, produto)
      .catch((error: any) => {
        console.error(error);
      });
  }
}