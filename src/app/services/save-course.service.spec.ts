import { TestBed } from '@angular/core/testing';

import { SaveCourseService } from './save-course.service';

describe('SaveCourseService', () => {
  let service: SaveCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
