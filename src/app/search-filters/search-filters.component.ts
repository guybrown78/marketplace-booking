import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DelegateService } from '../services/delegate.service'
import { CourseService } from '../services/course.service'

interface TypeOption {
  label: string;
  value: string;
}

@Component({
  selector: 'search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})

export class SearchFiltersComponent implements OnInit {

	dateFormat = 'dd/MM/yyyy';
	searchFiltersForm!: FormGroup;
	delegateOptions: string[] = [];
	courseOptions: string[] = [];
	typeOptions: TypeOption[] = [
		{ label: 'All', value: 'all' },
    { label: 'E-Learn', value: 'eLearn' },
    { label: 'V-Leran', value: 'vLearn' }
  ];
  constructor(
		private fb: FormBuilder,
		private delegateService: DelegateService,
		private courseService: CourseService,
	) {}

  ngOnInit(): void {
    this.searchFiltersForm = this.fb.group({
      delegate: [null],
      course: [null, [Validators.required]],
      type: ['all'],
      location: [null],
      startDate: [null],
    });
	}
	
	submitForm(): void {
		console.log("Boooom")
		console.log(this.searchFiltersForm.value)
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
  }

	onDelegateInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
		this.delegateOptions = this.delegateService.getFilteredDelegated(value.toLocaleLowerCase())
	}

	onCourseInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
		this.courseOptions = this.courseService.getFilteredCourses(value.toLocaleLowerCase());
	}
	
}
