import { Component, Input } from '@angular/core';

@Component({
  selector: 'column-title',
  templateUrl: './column-title.component.html',
  styleUrls: ['./column-title.component.css']
})
export class ColumnTitleComponent {

	@Input('mainTitle') mainTitle:String;
	@Input('subTitle') subTitle:String;
	
}
