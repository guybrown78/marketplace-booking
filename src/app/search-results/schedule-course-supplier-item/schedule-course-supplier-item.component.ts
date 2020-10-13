import { Component, Input } from '@angular/core';
import { ScheduledCourseSupplierModel } from '../../common/models/courses.model';
import { GetLocationsPipe } from '../../common/pipes/get-locations.pipe'
@Component({
  selector: 'schedule-course-supplier-item',
  templateUrl: './schedule-course-supplier-item.component.html',
	styleUrls: ['./schedule-course-supplier-item.component.css'],
	providers:[
		GetLocationsPipe
	]
})
export class ScheduleCourseSupplierItemComponent  {

	@Input('courseSupplier') courseSupplier:ScheduledCourseSupplierModel;
	@Input("is-open") isOpen:boolean = false;

	constructor(
		private getLocations:GetLocationsPipe,
	) { }

	onToggle(){
		this.isOpen = !this.isOpen;
	}
}
