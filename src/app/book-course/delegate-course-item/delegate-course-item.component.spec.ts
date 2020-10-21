import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateCourseItemComponent } from './delegate-course-item.component';

describe('DelegateCourseItemComponent', () => {
  let component: DelegateCourseItemComponent;
  let fixture: ComponentFixture<DelegateCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateCourseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
