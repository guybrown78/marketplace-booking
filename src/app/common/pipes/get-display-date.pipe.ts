import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'getDisplayDate',
	pure:true
})
export class GetDisplayDatePipe implements PipeTransform {

  transform(date:string, fromSB:boolean): unknown {
    return this.getNumberLabel(date, fromSB);
  }
	getNumberLabel(date:string, fromSB:boolean):String{
		const d = fromSB ? moment(date, 'DD/MM/YYYY') : moment(date);
		return d.format('Do MMM YYYY');
	}
}
