import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandCreatePage } from './land-create.page';

describe('LandCreatePage', () => {
  let component: LandCreatePage;
  let fixture: ComponentFixture<LandCreatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LandCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(LandCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
