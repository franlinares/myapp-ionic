import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
              private router: Router,
              public alertController: AlertController) {}

 async addLista() {
  
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Nueva lista',
    inputs: [
      {
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }
    ],
    buttons: [
      {
        text: 'Cancerlar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          }

          const listaId = this.deseosService.createList(data.titulo);
        // Crear la lista
           this.router.navigateByUrl(`/tabs/tab1/add/${listaId}`);
        }
      }
    ]
  });

  alert.present();
 }

 listSelected(lista: Lista) {
  
  this.router.navigateByUrl(`/tabs/tab1/add/${lista.id}`);
 }
}
