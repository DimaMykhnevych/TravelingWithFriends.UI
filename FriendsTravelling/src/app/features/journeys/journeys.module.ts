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
import { MyJourneysComponent } from './components/my-journeys/my-journeys.component';
import { MyJourneysService } from './services/my-journeys.service';
import { JourneysListComponent } from './components/journeys-list/journeys-list.component';
import { JourneyListItemComponent } from './components/journey-list-item/journey-list-item.component';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { AllJourneysComponent } from './components/all-journeys/all-journeys.component';
import { SearchJourneyFormComponent } from './components/search-journey-form/search-journey-form.component';
import { SearchJourneyFormContainerComponent } from './components/search-journey-form-container/search-journey-form-container.component';

@NgModule({
  declarations: [
    JourneysComponent,
    CreateJourneyFormComponent,
    CreateRouteFormComponent,
    CreateJourneyComponent,
    TransportFormComponent,
    MyJourneysComponent,
    JourneysListComponent,
    JourneyListItemComponent,
    AllJourneysComponent,
    SearchJourneyFormComponent,
    SearchJourneyFormContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule,
  ],
  providers: [LocationService, MyJourneysService],
})
export class JourneysModule {}
