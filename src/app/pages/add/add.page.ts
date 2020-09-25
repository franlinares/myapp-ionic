import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService, 
              private route: ActivatedRoute) { 

    const listaId = this.route.snapshot.paramMap.get('listaId');
    // console.log(listaId);
    this.lista = this.deseosService.getList(listaId);
    // console.log(this.lista);

  }

  ngOnInit() {
  }

  addItem() {
   if (this.nombreItem.length === 0) {
     return;
   }

   const nuevoItem = new ListaItem(this.nombreItem);
   this.lista.items.push(nuevoItem);

   this.nombreItem = '';
   this.deseosService.saveStorage();
  }

  changeCheck(item: ListaItem) {
    
    const pendientes = this.lista.items.filter(itemData => {
      return !itemData.completado;
    }).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.saveStorage(); 
  }

  delete(i: number) {
    
   this.lista.items.splice(i, 1); 

   this.deseosService.saveStorage();
  }
}
