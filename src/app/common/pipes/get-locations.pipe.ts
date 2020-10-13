import { Pipe, PipeTransform } from '@angular/core';
import { CourseLocationModel, ScheduledCourseSupplierModel } from '../models/courses.model'

@Pipe({
  name: 'getLocations'
})
export class GetLocationsPipe implements PipeTransform {

  transform(locations:CourseLocationModel[], ...args: unknown[]): unknown {
    return this.getLocations(locations);
  }

	getLocations(locations:CourseLocationModel[]):String{
		return locations.length > 1 ? `${locations.length} locations` : locations[0].name;
	}
}
