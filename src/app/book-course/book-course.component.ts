import { Component, OnInit } from '@angular/core';
import { UrlDataService } from '../services/url-data.service';


@Component({
  selector: 'app-book-course',
  templateUrl: './book-course.component.html',
  styleUrls: ['./book-course.component.css']
})
export class BookCourseComponent implements OnInit {

  constructor(
		public urlService: UrlDataService,
	) { }

  ngOnInit(): void {
  }

}
