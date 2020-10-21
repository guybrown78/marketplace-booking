import { Component, Input } from '@angular/core';
import { CourseModel } from '../../common/models/courses.model'
import { GetNumberLabelPipe } from '../../common/pipes/get-number-label.pipe'
import { GetDisplayDatePipe } from '../../common/pipes/get-display-date.pipe'
import { GetCoursePricePipe } from '../../common/pipes/get-course-price.pipe'
import { GetCourseTaxPipe } from '../../common/pipes/get-course-tax.pipe'
import { GetCourseDurationPipe } from '../../common/pipes/get-course-duration.pipe'

@Component({
  selector: 'selected-course-item',
  templateUrl: './selected-course-item.component.html',
	styleUrls: ['./selected-course-item.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetDisplayDatePipe,
		GetCoursePricePipe,
		GetCourseTaxPipe,
		GetCourseDurationPipe
	]
})
export class SelectedCourseItemComponent{

  @Input('course') course:CourseModel;

  constructor(
		private getNumberLabel:GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe,
		private getCoursePrice:GetCoursePricePipe,
		private getCourseTax:GetCourseTaxPipe,
		private getCourseDuration:GetCourseDurationPipe,
	) { }

}
