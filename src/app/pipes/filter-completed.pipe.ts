import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../pages/models/lista.model';

@Pipe({
  name: 'filterCompleted',
  // Cada vez que se use el pipe recargara el contenido
  pure:false
})
export class FilterCompletedPipe implements PipeTransform {

  transform(listas: Lista[], completed: boolean = true): Lista[] {

    return listas.filter(lista =>  lista.terminada === completed);;
  }

}
