import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getNumberLabel',
	pure:true
})
export class GetNumberLabelPipe implements PipeTransform {

  transform(count:number, label:string, pluralLabel:string): unknown {
    return this.getNumberLabel(count, label, pluralLabel)
  }

	getNumberLabel(count:number, label:string, pluralLabel:string):String{
		const lbl:string = count != 1 ?  pluralLabel ? pluralLabel : `${label}s` : label;
		return `${count} ${lbl}`;
	}
}
