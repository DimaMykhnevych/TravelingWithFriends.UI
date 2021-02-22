import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ISearchJourneyModel } from 'src/app/core/models/search-journey';

@Component({
  selector: 'app-search-journey-form',
  templateUrl: './search-journey-form.component.html',
  styleUrls: ['./search-journey-form.component.scss'],
})
export class SearchJourneyFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private _destroy$: Subject<void> = new Subject<void>();
  constructor(private _builder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      startPrice: new FormControl('', []),
      endPrice: new FormControl('', []),
      minAge: new FormControl('', []),
      maxAge: new FormControl('', []),
    });
    this.subscribeOnFormValueChanges();
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value: ISearchJourneyModel) => {
        this.checkEndPrice(value);
        this.checkAge(value);
      });
  }

  private checkEndPrice(value: ISearchJourneyModel): void {
    let minPrice = Number(value.startPrice);
    let maxPrice = Number(value.endPrice);
    if (minPrice !== 0 && maxPrice !== 0) {
      if (minPrice > maxPrice) {
        this.form.controls.endPrice.setErrors({
          wrongEndPrice: true,
        });
      } else {
        this.form.controls.endPrice.setErrors(null);
      }
    }
  }

  private checkAge(value: ISearchJourneyModel): void {
    if (value.minAge !== 0 && value.maxAge !== 0) {
      if (value.minAge > value.maxAge) {
        this.form.controls.maxAge.setErrors({
          wrongMaxAge: true,
        });
      } else {
        this.form.controls.maxAge.setErrors(null);
      }
    }
  }

  public clearInputFields(): void {
    this.startPrice.reset();
    this.endPrice.reset();
    this.minAge.reset();
    this.maxAge.reset();
  }

  get startPrice() {
    return this.form.get('startPrice');
  }
  get endPrice() {
    return this.form.get('endPrice');
  }
  get minAge() {
    return this.form.get('minAge');
  }
  get maxAge() {
    return this.form.get('maxAge');
  }
}
