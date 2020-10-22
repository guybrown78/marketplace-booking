import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TennantService } from '../../services/tennant.service'
import { CourseModel, BookingItemItentifierModel } from '../../common/models/courses.model'
import { DelegateModel } from '../../common/models/delegate.model'
import { GetNumberLabelPipe } from '../../common/pipes/get-number-label.pipe'
import { GetDisplayDatePipe } from '../../common/pipes/get-display-date.pipe'
import { GetCoursePricePipe } from '../../common/pipes/get-course-price.pipe'
import { GetCourseTaxPipe } from '../../common/pipes/get-course-tax.pipe'
import { GetCourseDurationPipe } from '../../common/pipes/get-course-duration.pipe'
import { GetUsersFullNamePipe } from '../../common/pipes/get-users-full-name.pipe';
import { GetUsersTennantJobRolePipe } from '../../common/pipes/get-users-tennant-job-role.pipe';

import { bookingItemInOutAnimation, fadeInOutAnimation, delegateInOutAnimation } from '../../common/animations';
@Component({
  selector: 'delegate-course-item',
  templateUrl: './delegate-course-item.component.html',
	styleUrls: ['./delegate-course-item.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetDisplayDatePipe,
		GetCoursePricePipe,
		GetCourseTaxPipe,
		GetCourseDurationPipe,
		GetUsersTennantJobRolePipe
	],
	animations: [ bookingItemInOutAnimation, delegateInOutAnimation, fadeInOutAnimation ]
})
export class DelegateCourseItemComponent {

  @Input('course') course:CourseModel;
	@Input('delegate') delegate:DelegateModel;
	@Output("removeBookingItem") removeBookingItem:EventEmitter<BookingItemItentifierModel> = new EventEmitter<BookingItemItentifierModel>();

	show:boolean = true;

  constructor(
		public tennantService: TennantService,
		private getNumberLabel:GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe,
		private getCoursePrice:GetCoursePricePipe,
		private getCourseTax:GetCourseTaxPipe,
		private getCourseDuration:GetCourseDurationPipe,
		private getUsersFullName: GetUsersFullNamePipe,
		private getUsersTennantJobRole: GetUsersTennantJobRolePipe
	) { }

	onRemoveClicked(){
		this.show = false;
	}

	onFadeOutComplete(){
		if(!this.show){
			const bookinItem:BookingItemItentifierModel = {
				scheduledCourseId:this.course.scheduledCourseId,
				delegateId:this.delegate.id
			};
			this.removeBookingItem.emit(bookinItem);
		}
			
	}
}
