import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IJourneyModel } from 'src/app/core/models/journey';
import { AvailablePlacesValidator } from '../../validators/available-places.validator';
import { StartDateValidator } from '../../validators/start-date.validator';

@Component({
  selector: 'app-create-journey-form',
  templateUrl: './create-journey-form.component.html',
  styleUrls: ['./create-journey-form.component.scss'],
})
export class CreateJourneyFormComponent implements OnInit, OnDestroy {
  @Input() public set wasJourneyRequested(result: boolean) {
    this._wasJourneyRequested = result;
    this.initializeForm(this._journey);
  }
  public get wasJourneyRequested(): boolean {
    return this._wasJourneyRequested;
  }
  @Input() public set journey(j: IJourneyModel) {
    this._journey = j;
  }
  public get journey(): IJourneyModel {
    return this._journey;
  }
  public form: FormGroup;
  public submitted: boolean = false;

  private _journey: IJourneyModel;
  private _destroy$: Subject<void> = new Subject<void>();
  private _wasJourneyRequested: boolean;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  public ngOnInit(): void {
    this.subscribeOnFormValueChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

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

  private initializeForm(journey: IJourneyModel): void {
    this.form = this._builder.group({
      startDate: new FormControl(journey?.startDate, [
        Validators.required,
        StartDateValidator(this.journey),
      ]),
      endDate: new FormControl(journey?.endDate, [Validators.required]),
      price: new FormControl(journey?.price, [
        Validators.required,
        Validators.min(3),
      ]),
      availablePlaces: new FormControl(journey?.availablePlaces, [
        Validators.required,
        Validators.min(1),
        AvailablePlacesValidator(this.journey, this.wasJourneyRequested),
      ]),
      minimumRequiredAge: new FormControl(journey?.minimumRequiredAge, [
        Validators.required,
        Validators.min(18),
      ]),
      maximumRequiredAge: new FormControl(journey?.maximumRequiredAge, [
        Validators.required,
        Validators.min(18),
      ]),
      description: new FormControl(journey?.description, [Validators.required]),
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => {
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
          this.form.controls.maximumRequiredAge.setErrors({
            wrongMaxAge: true,
          });
        } else {
          this.form.controls.maximumRequiredAge.setErrors(null);
        }
      });
  }
}
