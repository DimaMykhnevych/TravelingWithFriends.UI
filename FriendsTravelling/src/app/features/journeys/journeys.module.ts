import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneysComponent } from './journeys.component';
import { MaterialModule } from 'src/app/layout/material';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CreateJourneyFormComponent } from './components/create-journey-form/create-journey-form.component';

@NgModule({
  declarations: [JourneysComponent, CreateJourneyFormComponent],
  imports: [CommonModule, MaterialModule, NgScrollbarModule],
})
export class JourneysModule {}
