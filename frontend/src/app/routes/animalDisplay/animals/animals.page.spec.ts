import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnimalsPage } from './animals.page';

describe('AnimalsPage', () => {
  let component: AnimalsPage;
  let fixture: ComponentFixture<AnimalsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnimalsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
