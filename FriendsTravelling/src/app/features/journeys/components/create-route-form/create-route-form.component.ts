import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-route-form',
  templateUrl: './create-route-form.component.html',
  styleUrls: ['./create-route-form.component.scss'],
})
export class CreateRouteFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.form = this._builder.group({
      locations: this._builder.array([
        this._builder.group({
          name: new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
        }),
      ]),
    });
  }

  public onAddRouteClick(): void {
    this.locations.push(
      this._builder.group({
        name: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      })
    );
  }

  public onDeleteRouteClick(index: number): void {
    this.locations.removeAt(index);
  }

  get locations() {
    return this.form.get('locations') as FormArray;
  }

  public getLocationNameErrorMesage(index: number): string {
    if (this.locations.controls[index].get('name')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  public getCountryErrorMessage(index: number): string {
    if (this.locations.controls[index].get('country')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
