import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth';
import { PersonalPageComponent } from '../personal-page-components/personal-page.component';

export const routes: Route[] = [
  {
    path: 'myPage',
    component: PersonalPageComponent,
    canActivate: [AuthGuard],
  },
];
