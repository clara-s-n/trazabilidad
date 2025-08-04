import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeighingFormComponent } from './weighing-form.component';

describe('WeighingFormComponent', () => {
  let component: WeighingFormComponent;
  let fixture: ComponentFixture<WeighingFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WeighingFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeighingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
