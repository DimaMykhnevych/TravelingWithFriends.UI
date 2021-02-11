import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneysComponent } from './journeys.component';
import { MaterialModule } from 'src/app/layout/material';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CreateJourneyFormComponent } from './components/create-journey-form/create-journey-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from './services/location.service';
import { CreateRouteFormComponent } from './components/create-route-form/create-route-form.component';
import { CreateJourneyComponent } from './components/create-journey/create-journey.component';
import { TransportFormComponent } from './components/transport-form/transport-form.component';

@NgModule({
  declarations: [JourneysComponent, CreateJourneyFormComponent, CreateRouteFormComponent, CreateJourneyComponent, TransportFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LocationService],
})
export class JourneysModule {}
