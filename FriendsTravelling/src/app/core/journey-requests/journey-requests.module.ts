import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { JourneyRequestsService } from './journey-requests.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class JourneyRequestsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: JourneyRequestsModule,
      providers: [JourneyRequestsService],
    };
  }
}
