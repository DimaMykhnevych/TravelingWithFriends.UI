import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalPageComponent } from './personal-page-components/personal-page.component';
import { CoreModule } from '../../core/core.module';
import { NavbarModule } from 'src/app/layout/navbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/layout/material';
import { ChangeProfileDialogModule } from 'src/app/layout/change-profile-dialog';
import { UserProfileService } from './services/user-profile.service';

@NgModule({
  declarations: [PersonalPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    NavbarModule,
    RouterModule,
    MaterialModule,
    ChangeProfileDialogModule,
  ],
  providers: [UserProfileService],
})
export class PersonalPageModule {}
