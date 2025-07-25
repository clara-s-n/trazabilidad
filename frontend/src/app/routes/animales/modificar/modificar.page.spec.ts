import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificarPage } from './modificar.page';

describe('ModificarPage', () => {
  let component: ModificarPage;
  let fixture: ComponentFixture<ModificarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModificarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
