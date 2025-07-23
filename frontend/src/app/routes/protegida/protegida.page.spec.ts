import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProtegidaPage } from './protegida.page';

describe('ProtegidaPage', () => {
  let component: ProtegidaPage;
  let fixture: ComponentFixture<ProtegidaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProtegidaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtegidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
