import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCorrectoComponent } from './registro-correcto.component';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'; import { SharedModule } from '../../shared.module';

describe('RegistroCorrectoComponent', () => {
  let component: RegistroCorrectoComponent;
  let fixture: ComponentFixture<RegistroCorrectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCorrectoComponent],
      imports: [SharedModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistroCorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
