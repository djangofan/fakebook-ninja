import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SongsComponent } from './songs.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongItemComponent } from './song-list/song-item/song-item.component';
import { SongStartComponent } from './song-start/song-start.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import { SongRoutingModule } from './song-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MeasureComponent } from './song-detail/measure/measure.component';
import { DemoMaterialModule } from './material-module';
import { ChordsPipe } from './chords.pipe';
import { SongPublicComponent } from './song-public/song-public.component';

@NgModule({
  declarations: [
    SongsComponent,
    SongListComponent,
    SongDetailComponent,
    SongItemComponent,
    SongStartComponent,
    SongEditComponent,
    MeasureComponent,
    ChordsPipe,
    SongPublicComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SongRoutingModule,
    DemoMaterialModule,
    SharedModule
  ]
})
export class SongsModule {}
