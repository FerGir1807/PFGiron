import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnosComponent } from './lista-alumnos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, StoreModule } from '@ngrx/store';
import { cargarAlumosState } from '../../state/alumnos-state.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { selectAlumnosCargados, selectCargandoAlumnos } from '../../state/alumnos-state.selectors';
import { AlumnoState, alumnoReducer, alumnosStateFeatureKey } from '../../state/alumnos-state.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('Test para ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;
  let store: MockStore<AlumnoState>;
  let initialState: AlumnoState = {
    cargando: false,
    alumnos: []
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAlumnosComponent],
      imports: [MatDialogModule, HttpClientModule, StoreModule.forRoot({}), StoreModule.forFeature(alumnosStateFeatureKey, alumnoReducer), MatProgressSpinnerModule,],
      providers: [
        MatSnackBar,
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    store = TestBed.get<Store<AlumnoState>>(Store);
    component = fixture.componentInstance;
    //fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
