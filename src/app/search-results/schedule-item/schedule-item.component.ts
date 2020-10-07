import { Component, OnInit, Input } from '@angular/core';
import { CourseModel } from '../../common/models/courses.model'
@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {

	@Input('course') course:CourseModel;
  constructor() { }

  ngOnInit(): void {
  }

}
