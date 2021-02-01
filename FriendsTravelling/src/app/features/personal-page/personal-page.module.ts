import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalPageComponent } from './personal-page-components/personal-page.component';
import { PersonalPageRoutingModule } from './routes/personal-page-routing.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [PersonalPageComponent],
  imports: [CommonModule, PersonalPageRoutingModule, CoreModule],
})
export class PersonalPageModule {}
