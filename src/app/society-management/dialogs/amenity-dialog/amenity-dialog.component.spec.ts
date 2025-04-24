import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityDialogComponent } from './amenity-dialog.component';

describe('AmenityDialogComponent', () => {
  let component: AmenityDialogComponent;
  let fixture: ComponentFixture<AmenityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
