import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnosComponent } from './lista-alumnos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('Test para ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAlumnosComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        MatSnackBar
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Se cargan los alumnos correctamente", done => {

    component.alumnos$.subscribe((alumnos) => {
      expect(alumnos.length).toBeGreaterThan(0);
      done();
    });
  });
});
