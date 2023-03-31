import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Pipe({
  name: 'nombreUsuario'
})
export class NombreUsuarioPipe implements PipeTransform {

  transform(usuario: Usuario): string {
    return `${usuario.nombre} ${usuario.segundoNombre == null ? '' : usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido == null ? '' : usuario.segundoApellido}`;
  }

}
