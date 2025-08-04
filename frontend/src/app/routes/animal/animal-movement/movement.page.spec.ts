import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovementsPage } from './animal-movement.page';

describe('MovementsPage', () => {
  let component: MovementsPage;
  let fixture: ComponentFixture<MovementsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MovementsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
