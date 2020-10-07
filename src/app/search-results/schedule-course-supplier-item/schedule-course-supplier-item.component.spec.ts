import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCourseSupplierItemComponent } from './schedule-course-supplier-item.component';

describe('ScheduleCourseSupplierItemComponent', () => {
  let component: ScheduleCourseSupplierItemComponent;
  let fixture: ComponentFixture<ScheduleCourseSupplierItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCourseSupplierItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCourseSupplierItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
