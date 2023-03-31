import { Pipe, PipeTransform } from '@angular/core';
import { Profesor } from 'src/app/models/profesor';

@Pipe({
  name: 'nombreProfesor'
})
export class NombreProfesorPipe implements PipeTransform {

  transform(profesor: Profesor): string {
    return `${profesor.nombre} ${profesor.segundoNombre == null ? '' : profesor.segundoNombre} ${profesor.primerApellido} ${profesor.segundoApellido == null ? '' : profesor.segundoApellido}`;
  }
}
