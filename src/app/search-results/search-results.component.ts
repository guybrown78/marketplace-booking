import { Component, OnInit } from '@angular/core';
import { UrlDataService } from '../url-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
		public urlService: UrlDataService,
	) { }

  ngOnInit(): void {
  }

}
