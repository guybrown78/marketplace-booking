import { Component, Input } from '@angular/core';
import { ScheduledCourseSupplierModel } from '../../common/models/courses.model'
@Component({
  selector: 'schedule-course-supplier-item',
  templateUrl: './schedule-course-supplier-item.component.html',
  styleUrls: ['./schedule-course-supplier-item.component.css']
})
export class ScheduleCourseSupplierItemComponent  {

	@Input('courseSupplier') courseSupplier:ScheduledCourseSupplierModel;
	@Input("is-open") isOpen:boolean = false;

	onToggle(){
		this.isOpen = !this.isOpen;
	}
}
