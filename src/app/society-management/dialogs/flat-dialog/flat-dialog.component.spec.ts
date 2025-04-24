import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDialogComponent } from './flat-dialog.component';

describe('FlatDialogComponent', () => {
  let component: FlatDialogComponent;
  let fixture: ComponentFixture<FlatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
