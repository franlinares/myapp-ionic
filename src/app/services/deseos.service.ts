import { Injectable } from '@angular/core';
import { Lista } from '../pages/models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  
  listas: Lista[] = [];

  constructor() { 

    this.loadStorage();

    // Ejemplo para al inicio tener listas
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Héroes a desaparecer');

    // this.listas.push(lista1, lista2);

   
  }

  createList(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.saveStorage();

    return nuevaLista.id;
  }

  getList(id: string | number) {

    id = Number(id);

   return this.listas.find(listaData => listaData.id === id);
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas))
  }

  loadStorage() {

    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    } 
  }

}
