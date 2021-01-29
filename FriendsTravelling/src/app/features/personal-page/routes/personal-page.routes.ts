import { Route } from '@angular/router';
import { PersonalPageComponent } from '../personal-page-components/personal-page.component';

export const routes: Route[] = [
  {
    path: 'myPage',
    component: PersonalPageComponent,
  },
];
