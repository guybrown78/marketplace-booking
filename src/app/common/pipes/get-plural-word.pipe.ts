import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getPluralWord',
	pure: true
})
export class GetPluralWordPipe implements PipeTransform {

  transform(count:number, singular:string, plural:string): unknown {
    return this.getPluralWord(count, singular, plural);
  }

	getPluralWord(count:number, singular:string, plural:string):String{
		return count > 1 ?  plural : singular;
	}
}
