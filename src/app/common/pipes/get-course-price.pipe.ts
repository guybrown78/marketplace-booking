import { Pipe, PipeTransform } from '@angular/core';
import { CoursePricesModel } from '../models/courses.model'
import { getCurencySymbol } from '../utils'
@Pipe({
	name: 'getCoursePrice',
	pure:true
})
export class GetCoursePricePipe implements PipeTransform {

  transform(priceModel: CoursePricesModel, ...args: unknown[]): unknown {
    return this.getPrice(priceModel);
  }

	getPrice(priceModel:CoursePricesModel):String{
		return `${getCurencySymbol(priceModel.currency)}${priceModel.total}`
	}
}
