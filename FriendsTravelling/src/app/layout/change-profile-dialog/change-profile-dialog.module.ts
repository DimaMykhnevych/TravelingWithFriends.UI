import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileDialogComponent } from './change-profile-dialog.component';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangeProfileDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ChangeProfileDialogComponent],
})
export class ChangeProfileDialogModule {}
