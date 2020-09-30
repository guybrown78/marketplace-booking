import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { SearchMarketplaceComponent } from './search-marketplace/search-marketplace.component'
import { SearchResultsComponent } from './search-results/search-results.component'
const routes: Routes = [
	{ 
		path: '', 
		component: SearchMarketplaceComponent, 
		data: {} 
	},
	{ 
		path: 'search', 
		component: SearchMarketplaceComponent, 
		data: {} 
	},
	{ 
		path: 'results', 
		component: SearchResultsComponent, 
		data: {} 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
