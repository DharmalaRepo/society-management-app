import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDialogComponent } from './parking-dialog.component';

describe('ParkingDialogComponent', () => {
  let component: ParkingDialogComponent;
  let fixture: ComponentFixture<ParkingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
