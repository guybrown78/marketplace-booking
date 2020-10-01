import { Injectable } from '@angular/core';
import { courseData } from '../data/courseData'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

	constructor() { }
	
	public getFilteredCourses(str:string):any[]{
		console.log(str)
		// console.log(courseData.map())
		const updatedData = courseData.filter(
			c => c.name.toLowerCase().includes(str)
		);
		return updatedData.map(c => c.name)
	}
}
