import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './personal-page.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
})
export class PersonalPageRoutingModule {}
