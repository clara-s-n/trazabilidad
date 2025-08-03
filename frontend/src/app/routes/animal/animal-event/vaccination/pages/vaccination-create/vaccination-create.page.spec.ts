import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VaccinationCreatePage } from './vaccination-create.page';

describe('VaccinationCreatePage', () => {
  let component: VaccinationCreatePage;
  let fixture: ComponentFixture<VaccinationCreatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VaccinationCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinationCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
