import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCourseItemComponent } from './selected-course-item.component';

describe('SelectedCourseItemComponent', () => {
  let component: SelectedCourseItemComponent;
  let fixture: ComponentFixture<SelectedCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCourseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
