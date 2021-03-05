import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewRouteComponent } from './components/review-route/review-route.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [ReviewRouteComponent],
  imports: [CommonModule, AgmCoreModule, AgmDirectionModule],
})
export class GoogleMapsModule {}
