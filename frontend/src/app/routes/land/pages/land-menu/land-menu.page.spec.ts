import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandMenuPage } from './land-menu.page';

describe('LandMenuPage', () => {
  let component: LandMenuPage;
  let fixture: ComponentFixture<LandMenuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LandMenuPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LandMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
