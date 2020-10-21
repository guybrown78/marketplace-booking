import { Pipe, PipeTransform } from '@angular/core';
import { getCurencySymbol } from '../utils'
import { CoursePriceCurrency } from '../models/courses.model'

@Pipe({
	name: 'getDisplayPrice',
	pure:true
})

export class GetDisplayPricePipe implements PipeTransform {

  transform(price:number, currency:CoursePriceCurrency): unknown {
		return this.getDisplayPrice(price, currency);
	}

	getDisplayPrice(price:number, currency:CoursePriceCurrency):String{
		let p = ((price * 100) / 100).toFixed(2);
		return `${getCurencySymbol(currency)}${p}`
	}

}
