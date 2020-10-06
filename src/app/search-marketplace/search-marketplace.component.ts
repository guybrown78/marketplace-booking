import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlDataService } from '../services/url-data.service';
import { TennantService } from '../services/tennant.service';
import { TennantModel } from '../common/models/tennant.model'
import { AppError } from '../common/errors/app.error'
@Component({
  selector: 'app-search-marketplace',
  templateUrl: './search-marketplace.component.html',
  styleUrls: ['./search-marketplace.component.css']
})
export class SearchMarketplaceComponent implements OnInit {

	error:string = null;

  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private urlService: UrlDataService,
		private tennantService: TennantService
	) { }

  ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.urlService.setUrlQueryData(params);
		});
		//
		console.log(this.urlService.entryData);
		console.log(this.urlService.returnData);
		//
		if(this.urlService.entryData.tennantId){
			console.log(this.urlService.entryData.tennantId);
			this.tennantService.getTennant(this.urlService.entryData.tennantId).subscribe((tennant:TennantModel) => {
				this.tennantService.tennant = tennant;
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong loading the tennant";
			});
		}
  }

}
