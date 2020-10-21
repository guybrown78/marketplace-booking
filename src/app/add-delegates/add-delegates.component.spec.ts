import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelegatesComponent } from './add-delegates.component';

describe('AddDelegatesComponent', () => {
  let component: AddDelegatesComponent;
  let fixture: ComponentFixture<AddDelegatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDelegatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDelegatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
