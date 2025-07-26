import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeletePage } from './user-delete.page';

describe('DeletePage', () => {
  let component: DeletePage;
  let fixture: ComponentFixture<DeletePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeletePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
