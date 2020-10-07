import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { SearchMarketplaceComponent } from './search-marketplace/search-marketplace.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { BookCourseComponent } from './book-course/book-course.component';
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
	// { 
	// 	path: 'results', 
	// 	component: SearchResultsComponent, 
	// 	data: {} 
	// },
	{ 
		path: 'confirm', 
		component: BookCourseComponent, 
		data: {} 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
