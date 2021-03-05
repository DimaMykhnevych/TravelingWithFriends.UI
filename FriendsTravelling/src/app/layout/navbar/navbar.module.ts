import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { CoreModule } from 'src/app/core/core.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, MaterialModule, CoreModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
