import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeighingCreatePage } from './weighing-create.page';

describe('WeighingCreatePage', () => {
  let component: WeighingCreatePage;
  let fixture: ComponentFixture<WeighingCreatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WeighingCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(WeighingCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
