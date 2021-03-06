
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongResolverService } from '../songs/song-resolver.service';
import { PublicSongStartComponent } from './public-song-start/public-song-start.component';

const routes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    children: [
      { path: '', component: PublicSongStartComponent },
      {
        path: ':id',
        component: SongDetailComponent,
        resolve: [SongResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
