import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent {
  @Input('title') title:String;
}
