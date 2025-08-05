import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteUserModalComponent } from './delete-user-modal.component';

describe('DeleteUserModalComponent', () => {
  let component: DeleteUserModalComponent;
  let fixture: ComponentFixture<DeleteUserModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeleteUserModalComponent] // Import as standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
