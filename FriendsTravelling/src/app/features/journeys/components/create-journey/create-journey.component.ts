import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IJourneyModel } from 'src/app/core/models/journey';
import { IAddJourney } from '../../models/add-journey';
import { IJourney } from '../../models/journey';
import { ILocation } from '../../models/location';
import { ITransport } from '../../models/transport';
import { AddJourneyService } from '../../services/add-journey.service';
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
  journeyForm: CreateJourneyFormComponent = null as any;
  @ViewChild('routeForm')
  routeForm: CreateRouteFormComponent = null as any;
  @ViewChild('transportForm')
  transportForm: TransportFormComponent = null as any;

  private transport: ITransport = null as any;
  private locationFormValue: { locations: ILocation[] } = { locations: [] };
  private locations: ILocation[] = [];
  private journey: IJourney = null as any;
  private addJourneyModel: IAddJourney = null as any;
  private addedJourney: IJourneyModel = null as any;

  constructor(
    private _addJourneyService: AddJourneyService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public onSubmitClick() {
    this.transport = this.transportForm.form.value;
    this.locationFormValue = this.routeForm.form.value;
    this.locations = this.locationFormValue.locations;
    this.journey = this.journeyForm.form.value;

    this.addCoordinates();

    this.addJourneyModel = {
      journey: this.journey,
      locations: this.locations,
      transport: this.transport,
    };

    this._addJourneyService
      .addJourney(this.addJourneyModel)
      .subscribe((response) => {
        if (response) {
          this.addedJourney = response;
          this._toastr.success('Your journey was added successfully');
          this.router.navigate(['/profile/myJourneys']);
        }
      });
  }

  private addCoordinates() {
    this.locations.forEach((el) => {
      el.latitude = this.getRandomIntInclusive(-90, 90).toString();
      el.longtitude = this.getRandomIntInclusive(-180, 180).toString();
    });
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
