import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPagingComponent } from './post-paging.component';

describe('PostPagingComponent', () => {
  let component: PostPagingComponent;
  let fixture: ComponentFixture<PostPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
