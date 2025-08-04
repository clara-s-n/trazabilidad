import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeighingListPage } from './weighing-list.page';

describe('WeighingListPage', () => {
  let component: WeighingListPage;
  let fixture: ComponentFixture<WeighingListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WeighingListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WeighingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
