import { Routes } from '@angular/router';
import { HomePage, ProfilePage } from './pages';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Home',
  },
  {
    path: ':username',
    component: ProfilePage,
    title: 'Profile',
  },
];
