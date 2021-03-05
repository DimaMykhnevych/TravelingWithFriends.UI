import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileDialogComponent } from './change-profile-dialog.component';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileImageService } from './services/profile-image.service';

@NgModule({
  declarations: [ChangeProfileDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ChangeProfileDialogComponent],
  providers: [ProfileImageService],
})
export class ChangeProfileDialogModule {}
