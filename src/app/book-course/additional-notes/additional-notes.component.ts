import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'additional-notes',
  templateUrl: './additional-notes.component.html',
  styleUrls: ['./additional-notes.component.css']
})
export class AdditionalNotesComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    //
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      poNumber: [null],
      level: [null],
      tmsCost: [null],
      trainingReason: [null],
    });
  }

}
