import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalPageComponent } from './personal-page.component';
import { CoreModule } from '../../core/core.module';
import { NavbarModule } from 'src/app/layout/navbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/layout/material';
import { ChangeProfileDialogModule } from 'src/app/layout/dialogs/change-profile-dialog';
import { UserProfileService } from './services/user-profile.service';
import { PersonalProfileSummaryComponent } from './components/personal-profile-summary/personal-profile-summary.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    PersonalPageComponent,
    PersonalProfileSummaryComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NavbarModule,
    RouterModule,
    MaterialModule,
    ChangeProfileDialogModule,
  ],
  providers: [UserProfileService],
  exports: [],
})
export class PersonalPageModule {}
