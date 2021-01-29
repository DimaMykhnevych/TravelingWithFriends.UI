import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalPageComponent } from './personal-page-components/personal-page.component';
import { PersonalPageRoutingModule } from './routes/personal-page-routing.module';

@NgModule({
  declarations: [PersonalPageComponent],
  imports: [CommonModule, PersonalPageRoutingModule],
})
export class PersonalPageModule {}
