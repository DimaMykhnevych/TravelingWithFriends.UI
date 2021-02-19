import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IRouteModel } from 'src/app/core/models/route';
import { IRouteLocationModel } from 'src/app/core/models/route-location';

@Component({
  selector: 'app-create-route-form',
  templateUrl: './create-route-form.component.html',
  styleUrls: ['./create-route-form.component.scss'],
})
export class CreateRouteFormComponent implements OnInit {
  @Input() public set route(r: IRouteModel) {
    this._route = r;
    this.initializeForm(r);
  }
  public get route(): IRouteModel {
    return this._route;
  }
  public form: FormGroup;
  private _route: IRouteModel;
  private _formArray = [this.getFormArrayElement(null)];

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {}

  public onAddRouteClick(): void {
    this.locations.push(this.getFormArrayElement(null));
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

  private initializeForm(r: IRouteModel): void {
    if (r !== null) {
      this._formArray = [];
      r?.routeLocations?.forEach((r) => {
        this._formArray.push(this.getFormArrayElement(r));
      });
    }
    this.form = this._builder.group({
      locations: this._builder.array(this._formArray),
    });
  }

  private getFormArrayElement(data: IRouteLocationModel): FormGroup {
    return this._builder.group({
      name: new FormControl(data?.location?.name, [Validators.required]),
      country: new FormControl(data?.location?.country, [Validators.required]),
    });
  }
}
