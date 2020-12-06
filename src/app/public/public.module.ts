import { PublicSongItemComponent } from './public-song-list/public-song-item/public-song-item.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicComponent } from './public.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongStartComponent } from './song-start/song-start.component';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MeasureComponent } from './song-detail/measure/measure.component';
import { PublicSongListComponent } from './public-song-list/public-song-list.component';

@NgModule({
  declarations: [
    PublicComponent,
    PublicSongListComponent,
    PublicSongItemComponent,
    SongDetailComponent,
    SongStartComponent,
    MeasureComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule {}
