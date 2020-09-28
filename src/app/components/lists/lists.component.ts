import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../../pages/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {


  // Viewchild permite seleccionar un elemento html
  @ViewChild(IonList) lista: IonList;
  @Input() finished = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController
              ) { }

  ngOnInit() {}

  listSelected(lista: Lista) {
  
    if (this.finished) {
      this.router.navigateByUrl(`/tabs/tab2/add/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${lista.id}`);
    }
    
   }

   deleteList(lista: Lista) {
      this.deseosService.deleteLista(lista);
   }

   async editList(list: Lista) {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancerlar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
  
              list.titulo = data.titulo;
              
              this.deseosService.saveStorage();

              this.lista.closeSlidingItems();
          }
        }
      ]
    });
  
    alert.present();
   }
}
