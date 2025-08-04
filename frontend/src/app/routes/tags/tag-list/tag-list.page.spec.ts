import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagListPage } from './tag-list.page';

describe('TagListPage', () => {
  let component: TagListPage;
  let fixture: ComponentFixture<TagListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TagListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TagListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
