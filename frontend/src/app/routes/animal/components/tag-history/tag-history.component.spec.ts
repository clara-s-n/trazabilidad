import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagHistoryComponent } from './tag-history.component';

describe('TagHistoryComponent', () => {
  let component: TagHistoryComponent;
  let fixture: ComponentFixture<TagHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TagHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
