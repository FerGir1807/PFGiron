import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { SesionGuard } from '../core/guards/sesion.guard';
import { AgregarCursosComponent } from './components/agregar-cursos/agregar-cursos.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';

const routes: Routes = [
    {
        path: "", canActivateChild: [SesionGuard], children: [
            { path: "listaCursos", component: ListaCursosComponent },
            { path: "agregarCursos", component: AgregarCursosComponent, canActivate: [AdminGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursosRoutingModule { }