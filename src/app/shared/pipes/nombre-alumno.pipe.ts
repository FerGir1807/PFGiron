import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';

@Pipe({
  name: 'nombreAlumno'
})
export class NombreAlumnoPipe implements PipeTransform {

  transform(alumno: Alumno): string {
    return `${alumno.nombre} ${alumno.segundoNombre == null ? '' : alumno.segundoNombre} ${alumno.primerApellido} ${alumno.segundoApellido == null ? '' : alumno.segundoApellido}`;
  }
}
