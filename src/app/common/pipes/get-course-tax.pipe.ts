import { Pipe, PipeTransform } from '@angular/core';
import { CoursePricesModel } from '../models/courses.model'
import { getCurencySymbol } from '../utils'
import { _mpConfigTaxValue, _mpConfigTaxLabel } from '../../../config'
@Pipe({
	name: 'getCourseTax',
	pure:true
})
export class GetCourseTaxPipe implements PipeTransform {

  transform(priceModel: CoursePricesModel, ...args: unknown[]): unknown {
    return this.getPriceTax(priceModel);
  }

	getPriceTax(priceModel:CoursePricesModel):String{
		if(priceModel.incVat){
			return "-"
		}
		const taxedPrice = priceModel.total * _mpConfigTaxValue;
		return `${getCurencySymbol(priceModel.currency)}${taxedPrice}+${_mpConfigTaxLabel}`;
	}
}
