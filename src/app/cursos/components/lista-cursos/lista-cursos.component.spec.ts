import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from 'src/app/shared/services/cursos.service';

import { ListaCursosComponent } from './lista-cursos.component';

describe('Test para ListaCursosComponent', () => {
  let component: ListaCursosComponent;
  let fixture: ComponentFixture<ListaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCursosComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [CursosService, MatSnackBar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente se creó correctamente.', () => {
    expect(component).toBeTruthy();
  });

  it("Se cargan cursos correctamente", done => {

    component.cursos$.subscribe((cursos) => {
      expect(cursos.length).toBeGreaterThan(0);
      done();
    });
  });
});
