import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatePage } from './create.page';

describe('CreatePage', () => {
  let component: CreatePage;
  let fixture: ComponentFixture<CreatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
