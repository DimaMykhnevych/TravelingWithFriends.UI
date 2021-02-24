import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isNil } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { IJourneyModel } from 'src/app/core/models/journey';
import { ILocationModel } from 'src/app/core/models/location';
import { JourneyRequestService } from '../../services/journey-request.service';
import { JourneyService } from '../../services/journey.service';
import { CreateJourneyFormComponent } from '../create-journey-form/create-journey-form.component';
import { CreateRouteFormComponent } from '../create-route-form/create-route-form.component';
import { TransportFormComponent } from '../transport-form/transport-form.component';

@Component({
  selector: 'app-create-journey',
  templateUrl: './create-journey.component.html',
  styleUrls: ['./create-journey.component.scss'],
})
export class CreateJourneyComponent implements OnInit {
  @ViewChild('journeyForm')
  journeyForm: CreateJourneyFormComponent;
  @ViewChild('routeForm')
  routeForm: CreateRouteFormComponent;
  @ViewChild('transportForm')
  transportForm: TransportFormComponent;
  @Input() public journeyId: number = 0;

  private locationFormValue: { locations: ILocationModel[] } = {
    locations: [],
  };
  private journeyModel: IJourneyModel;
  public journeyToEdit: IJourneyModel;
  public isAdding: boolean = false;
  public isEditing: boolean = false;
  public isLoading: boolean = true;
  public wasJourneyRequested: boolean = false;

  constructor(
    private _toastr: ToastrService,
    private router: Router,
    private _journeyService: JourneyService,
    private _journeyRequestService: JourneyRequestService
  ) {}

  ngOnInit(): void {
    if (this.journeyId !== 0 && !isNaN(this.journeyId)) {
      this.findEditingJourneyInRequests();
      this.getJourneyToEdit();
    } else {
      this.isLoading = false;
    }
  }

  private findEditingJourneyInRequests(): void {
    this._journeyRequestService
      .getRequestByJourneyId(this.journeyId)
      .subscribe((resp) => {
        if (resp != null) {
          this.wasJourneyRequested = true;
        }
      });
  }

  private getJourneyToEdit() {
    this._journeyService
      .getJourneyById(this.journeyId)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.journeyToEdit = response;
        }
      });
  }

  public onSubmitClick() {
    this.bindFormValues();
    this.addCoordinates();
    if (this.journeyId !== 0 && !isNaN(this.journeyId)) {
      this.updateJourney();
    } else {
      this.addJourney();
    }
  }

  private addCoordinates() {
    this.journeyModel.route.routeLocations.forEach((el) => {
      if (el.location.latitude === undefined) {
        el.location.latitude = this.getRandomIntInclusive(-90, 90).toString();
        el.location.longtitude = this.getRandomIntInclusive(
          -180,
          180
        ).toString();
      }
    });
  }

  private addJourney(): void {
    this.isAdding = true;
    this._journeyService.addJourney(this.journeyModel).subscribe((response) => {
      if (response) {
        this.isAdding = false;
        this._toastr.success('Your journey was added successfully');
        this.router.navigate(['/profile/myJourneys']);
      }
    });
  }

  private updateJourney(): void {
    this.isEditing = true;
    this._journeyService
      .updateJourney(this.journeyId, this.journeyModel)
      .subscribe((response) => {
        if (response) {
          this.isEditing = false;
          this._toastr.success('Your journey was updated successfully');
          this.router.navigate(['/profile/myJourneys']);
        }
      });
  }

  private bindFormValues(): void {
    if (this.journeyId !== 0 && !isNaN(this.journeyId)) {
      this.bindUpdateFormValues();
    } else {
      this.bindAddFormValues();
    }
  }

  private bindAddFormValues(): void {
    this.locationFormValue = this.routeForm.form.value;
    this.journeyModel = this.journeyForm.form.value;
    this.journeyModel.route = {
      id: 0,
      transportId: 0,
      transport: this.transportForm.form.value,
      journeys: [],
      routeLocations: [],
    };
    this.journeyModel.route.transport.routes = [];
    for (let i = 0; i < this.locationFormValue.locations.length; i++) {
      this.journeyModel.route.routeLocations[i] = {
        route: null,
        id: 0,
        routeId: 0,
        locationId: 0,
        locationOrder: 0,
        location: this.locationFormValue.locations[i],
      };
    }
  }

  private bindJourneyModelToJourneyToEdit() {
    let journeyForm = this.journeyForm.form.value;
    let transportForm = this.transportForm.form.value;
    this.journeyModel = this.journeyToEdit;
    this.journeyModel.startDate = this.convertDateToRightFormat(
      journeyForm.startDate
    );
    this.journeyModel.endDate = this.convertDateToRightFormat(
      journeyForm.endDate
    );
    this.journeyModel.price = journeyForm.price;
    this.journeyModel.minimumRequiredAge = journeyForm.minimumRequiredAge;
    this.journeyModel.maximumRequiredAge = journeyForm.maximumRequiredAge;
    this.journeyModel.availablePlaces = journeyForm.availablePlaces;
    this.journeyModel.description = journeyForm.description;
    this.journeyModel.route.transport.name = transportForm.name;
    this.journeyModel.route.transport.description = transportForm.description;
  }

  private convertDateToRightFormat(date: Date): Date {
    if (typeof date === 'string') {
      return date;
    }
    let utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
    return utcDate;
  }

  private addNewLocations(): void {
    for (let i = 0; i < this.locationFormValue.locations.length; i++) {
      let currentLocation = this.journeyModel.route.routeLocations[i];
      if (!isNil(currentLocation)) {
        currentLocation.location.name = this.locationFormValue.locations[
          i
        ].name;
        currentLocation.location.country = this.locationFormValue.locations[
          i
        ].country;
      } else {
        this.journeyModel.route.routeLocations[i] = {
          route: null,
          id: 0,
          routeId: this.journeyToEdit?.route.id,
          locationId: 0,
          locationOrder: i + 1,
          location: this.locationFormValue.locations[i],
        };
      }
    }
  }

  private deleteLocations(): void {
    if (
      this.locationFormValue.locations.length <
      this.journeyModel.route.routeLocations.length
    ) {
      let difference =
        this.journeyModel.route.routeLocations.length -
        this.locationFormValue.locations.length;
      this.journeyModel.route.routeLocations.splice(-difference);
    }
  }

  private bindUpdateFormValues(): void {
    this.bindJourneyModelToJourneyToEdit();
    this.locationFormValue = this.routeForm.form.value;
    this.addNewLocations();
    this.deleteLocations();
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
