import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { ListaUsuariosComponent } from './lista-usuarios.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaUsuariosComponent],
      imports: [MatDialogModule, HttpClientModule, StoreModule.forRoot({})],
      providers: [
        MatSnackBar
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
