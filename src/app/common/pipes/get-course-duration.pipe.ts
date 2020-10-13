import { Pipe, PipeTransform } from '@angular/core';
import { CourseDurationModel } from '../models/courses.model'

@Pipe({
	name: 'getCourseDuration',
	pure:true
})
export class GetCourseDurationPipe implements PipeTransform {

  transform(durationModel:CourseDurationModel, ...args: unknown[]): unknown {
    return this.getCourseDuration(durationModel);
  }

	getCourseDuration(durationModel:CourseDurationModel):String{
		return durationModel.days ? `${durationModel.days} day course` : durationModel.hours ? `${durationModel.hours} hour course` : '-';
	}

}
