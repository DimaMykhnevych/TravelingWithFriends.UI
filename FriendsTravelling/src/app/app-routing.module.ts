import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth';
import { HomeComponent } from './features/home';
import { PersonalPageComponent } from './features/personal-page/personal-page-components/personal-page.component';

const routes: Routes = [
  {
    path: 'myPage',
    component: PersonalPageComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'test', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
