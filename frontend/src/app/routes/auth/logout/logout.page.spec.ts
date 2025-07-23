import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogoutPage } from './logout.page';

describe('LogoutPage', () => {
  let component: LogoutPage;
  let fixture: ComponentFixture<LogoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LogoutPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
