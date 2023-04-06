import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProfesoresComponent } from './lista-profesores.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';

describe('ListaProfesoresComponent', () => {
  let component: ListaProfesoresComponent;
  let fixture: ComponentFixture<ListaProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaProfesoresComponent],
      imports: [MatDialogModule, HttpClientModule, StoreModule.forRoot({})],
      providers: [
        MatSnackBar
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
