import { Pipe, PipeTransform } from '@angular/core';
import { CoursePricesModel, CoursePriceCurrency } from '../models/courses.model'
@Pipe({
	name: 'getCoursePrice',
	pure:true
})
export class GetCoursePricePipe implements PipeTransform {

  transform(priceModel: CoursePricesModel, ...args: unknown[]): unknown {
    return this.getPrice(priceModel);
  }

	getPrice(priceModel:CoursePricesModel):String{
		return `${this.getCurencySymbol(priceModel.currency)}${priceModel.total}`
	}

	getCurencySymbol(currency):String{
		switch(currency){
			case CoursePriceCurrency.GBP:
				return "£";
			case CoursePriceCurrency.USD:
				return "$";
			case CoursePriceCurrency.EUR:
				return "€";
		}
	}
}
