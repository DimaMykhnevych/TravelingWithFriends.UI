import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth';
import { HomeComponent } from './features/home';
import { AllJourneysComponent } from './features/journeys/components/all-journeys/all-journeys.component';
import { MyJourneysComponent } from './features/journeys/components/my-journeys/my-journeys.component';
import { JourneysComponent } from './features/journeys/journeys.component';
import { UserProfileComponent } from './features/personal-page/components/user-profile/user-profile.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
