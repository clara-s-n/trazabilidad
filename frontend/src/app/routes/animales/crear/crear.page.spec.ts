import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearPage } from './crear.page';

describe('CrearPage', () => {
  let component: CrearPage;
  let fixture: ComponentFixture<CrearPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CrearPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
