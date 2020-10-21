import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdditionalNotesModel } from '../../common/models/courses.model'
@Component({
  selector: 'additional-notes',
  templateUrl: './additional-notes.component.html',
  styleUrls: ['./additional-notes.component.css']
})
export class AdditionalNotesComponent implements OnInit {

  additionalNotesForm: FormGroup;

  @Output("additionalNotes") additionalNotes:EventEmitter<AdditionalNotesModel> = new EventEmitter<AdditionalNotesModel>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.additionalNotesForm = this.fb.group({
      poNumber: [null],
      level: [null],
      tmsCost: [null],
      trainingReason: [null],
		});
		this.onChanges();
  }

	onChanges(): void {
		this.additionalNotesForm.valueChanges.subscribe(val => {
			const addNotes:AdditionalNotesModel = val as AdditionalNotesModel;
			this.additionalNotes.emit(addNotes);	
		});
	}
}
