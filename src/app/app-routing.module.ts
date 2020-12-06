
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { PublicComponent } from './public/public.component';
import { HelpComponent } from './shared/help/help.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'public',
    component: PublicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
