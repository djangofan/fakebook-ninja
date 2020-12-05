import { SongPublicComponent } from './song-public/song-public.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsComponent } from './songs.component';
import { AuthGuard } from '../auth/auth.guard';
import { SongStartComponent } from './song-start/song-start.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongResolverService } from './song-resolver.service';
import { HelpComponent } from '../shared/help/help.component';

const routes: Routes = [
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'songs/:id/public',
    component: SongPublicComponent,
    resolve: [SongResolverService]
  },
  {
    path: 'songs',
    component: SongsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SongStartComponent },
      { path: 'new', component: SongEditComponent },
      {
        path: ':id',
        component: SongDetailComponent,
        resolve: [SongResolverService]
      },
      {
        path: ':id/edit',
        component: SongEditComponent,
        resolve: [SongResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule {}
