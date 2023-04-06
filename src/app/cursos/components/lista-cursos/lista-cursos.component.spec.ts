import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from 'src/app/shared/services/cursos.service';

import { ListaCursosComponent } from './lista-cursos.component';
import { Store, StoreModule } from '@ngrx/store';
import { CursoState, cursoReducer, cursoStateFeatureKey } from '../../state/curso-state.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cargarCursoState } from '../../state/curso-state.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { selectCursosCargados } from '../../state/curso-state.selectors';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from '../../state/curso-state.effects';

describe('Test para ListaCursosComponent', () => {
  let component: ListaCursosComponent;
  let fixture: ComponentFixture<ListaCursosComponent>;
  let store: Store<CursoState>;
  const initialState: CursoState = {
    cargando: false,
    cursos: []
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ListaCursosComponent],
      imports: [HttpClientModule, MatDialogModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), StoreModule.forFeature(cursoStateFeatureKey, cursoReducer),
        EffectsModule.forFeature([CursosEffects])],
      providers: [CursosService, MatSnackBar, provideMockStore({ initialState })]
    }).overrideTemplate(ListaCursosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ListaCursosComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
  });

  it('El componente se creó correctamente.', () => {
    expect(component).toBeTruthy();
  });


});
