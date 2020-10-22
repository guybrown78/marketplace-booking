import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledCourseSupplierModel } from '../../common/models/courses.model';
import { GetLocationsPipe } from '../../common/pipes/get-locations.pipe'
import { GetNumberLabelPipe } from '../../common/pipes/get-number-label.pipe'
import { GetDisplayDatePipe } from '../../common/pipes/get-display-date.pipe'
import { GetCoursePricePipe } from '../../common/pipes/get-course-price.pipe'
import { GetCourseTaxPipe } from '../../common/pipes/get-course-tax.pipe'
import { GetCourseDurationPipe } from '../../common/pipes/get-course-duration.pipe'
@Component({
  selector: 'schedule-course-supplier-item',
  templateUrl: './schedule-course-supplier-item.component.html',
	styleUrls: ['./schedule-course-supplier-item.component.css'],
	providers:[
		GetLocationsPipe,
		GetNumberLabelPipe,
		GetDisplayDatePipe,
		GetCoursePricePipe,
		GetCourseTaxPipe,
		GetCourseDurationPipe
	]
})
export class ScheduleCourseSupplierItemComponent  {

	@Input('courseSupplier') courseSupplier:ScheduledCourseSupplierModel;
	@Input("is-open") isOpen:boolean = false;

	constructor(
		private router: Router,
		private getLocations:GetLocationsPipe,
		private getNumberLabel:GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe,
		private getCoursePrice:GetCoursePricePipe,
		private getCourseTax:GetCourseTaxPipe,
		private getCourseDuration:GetCourseDurationPipe,
	) { }

	onToggle(){
		this.isOpen = !this.isOpen;
	}

	onCourseSelect(course){
		console.log(course)
		this.router.navigate([`/add-delegates/${course.scheduledCourseId}`]);
	}
}
