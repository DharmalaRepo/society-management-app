import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPassComponent } from './recurring-pass.component';

describe('RecurringPassComponent', () => {
  let component: RecurringPassComponent;
  let fixture: ComponentFixture<RecurringPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
