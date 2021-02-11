import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StartDateValidator } from '../../validators/start-date.validator';

@Component({
  selector: 'app-create-journey-form',
  templateUrl: './create-journey-form.component.html',
  styleUrls: ['./create-journey-form.component.scss'],
})
export class CreateJourneyFormComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.form = this._builder.group({
      startDate: new FormControl('', [Validators.required, StartDateValidator]),
      endDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(3)]),
      availablePlaces: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      minimumRequiredAge: new FormControl('', [
        Validators.required,
        Validators.min(18),
      ]),
      maximumRequiredAge: new FormControl('', [
        Validators.required,
        Validators.min(18),
      ]),
      description: new FormControl('', [Validators.required]),
    });

    this.form.valueChanges.subscribe((value) => {
      let startDate = this.form.controls.startDate.value;
      let endDate = this.form.controls.endDate.value;
      let minAge = this.form.controls.minimumRequiredAge.value;
      let maxAge = this.form.controls.maximumRequiredAge.value;
      if (endDate < startDate) {
        this.form.controls.endDate.setErrors({ wrongEndDate: true });
      } else {
        this.form.controls.endDate.setErrors(null);
      }
      if (minAge > maxAge) {
        this.form.controls.maximumRequiredAge.setErrors({ wrongMaxAge: true });
      } else {
        this.form.controls.maximumRequiredAge.setErrors(null);
      }
    });
  }

  public onSubmit(e: Event) {}

  get startDate() {
    return this.form.get('startDate');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get price() {
    return this.form.get('price');
  }
  get availablePlaces() {
    return this.form.get('availablePlaces');
  }
  get minimumRequiredAge() {
    return this.form.get('minimumRequiredAge');
  }
  get maximumRequiredAge() {
    return this.form.get('maximumRequiredAge');
  }
  get description() {
    return this.form.get('description');
  }
}
