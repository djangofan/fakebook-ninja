import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Song } from './song.model';
import { DataStorageService } from '../shared/data-storage.service';
import { SongsService } from './songs.service';

@Injectable({ providedIn: 'root' })
export class SongResolverService implements Resolve<Song[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private songsService: SongsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const songs = this.songsService.getSongs();
    if (songs.length === 0) {
      return this.dataStorageService.fetchSongs();
    } else {
      return songs;
    }
  }

}
