import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaleListPage } from './sale-list.page';

describe('SaleListPage', () => {
  let component: SaleListPage;
  let fixture: ComponentFixture<SaleListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SaleListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
