import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeTagStatusComponent } from './change-tag-status.component';

describe('ChangeTagStatusComponent', () => {
  let component: ChangeTagStatusComponent;
  let fixture: ComponentFixture<ChangeTagStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChangeTagStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTagStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
