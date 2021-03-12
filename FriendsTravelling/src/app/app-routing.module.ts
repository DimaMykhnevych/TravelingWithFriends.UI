import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth';
import {
  UserInboxRequestsComponent,
  UserRequestsComponent,
} from './features/journey-request-response/components';
import { AllJourneysComponent, MyJourneysComponent } from './features/journeys';
import { JourneysComponent } from './features/journeys/journeys.component';
import { UserProfileComponent } from './features/personal-page';
import { PersonalPageComponent } from './features/personal-page/personal-page.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'profile',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PersonalPageComponent },
      { path: 'journeys', component: JourneysComponent },
      { path: 'myJourneys', component: MyJourneysComponent },
      { path: 'allJourneys', component: AllJourneysComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'requests', component: UserRequestsComponent },
      { path: 'inbox-requests', component: UserInboxRequestsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
