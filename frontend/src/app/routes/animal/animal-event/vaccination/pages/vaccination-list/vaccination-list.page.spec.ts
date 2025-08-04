import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VaccinationListPage } from './vaccination-list.page';

describe('VaccinationListPage', () => {
  let component: VaccinationListPage;
  let fixture: ComponentFixture<VaccinationListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VaccinationListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
