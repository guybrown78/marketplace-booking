import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlDataService } from '../url-data.service';

@Component({
  selector: 'app-search-marketplace',
  templateUrl: './search-marketplace.component.html',
  styleUrls: ['./search-marketplace.component.css']
})
export class SearchMarketplaceComponent implements OnInit {

	isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		public urlService: UrlDataService,
	) { }
	// example query
	// ?entrydata=%7B"name":"Guy%20Brown","course":"Optito%20Bosiet%20with%20CA-EBS","location":"Teesside"%7D&returndata=%7B"type":"url","url":"https:%2F%2Ftf-ng-zorro.netlify.app%2Flms"%7D
  ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			if(!this.isObjectEmpty(params)){
				if(!this.isObjectEmpty(params.entrydata)){
					this.urlService.entryData = JSON.parse(params.entrydata)
				}
				if(!this.isObjectEmpty(params.returndata)){
					this.urlService.returnData = JSON.parse(params.returndata)
				}
				
			}
			
		});
		console.log(this.urlService.entryData);
		console.log(this.urlService.returnData);
  }

}
