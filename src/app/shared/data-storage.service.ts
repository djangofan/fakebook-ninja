import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { SongsService } from '../songs/songs.service';
import { environment } from 'src/environments/environment';
import { Song } from '../songs/song.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private songService: SongsService
  ) {}

  storeSongs() {
    const songs = this.songService.getSongs();
    const putUrl = environment.firebaseDBUrl + '/songs.json';
    this.http
      .put( putUrl, songs )
      .subscribe(response => {
        //console.log('DataStorageService: ', response);
      });
  }

  fetchSongs() {
    const getUrl = environment.firebaseDBUrl + '/songs.json';
    return this.http
      .get<Song[]>( getUrl )
      .pipe(
        // tap(songs => {
        //   console.log('songs: ', songs);
        // }),
        map(songs => {
          return songs.map(song => {
            return {
              ...song
            };
          });
        }),
        tap(songs => {
          this.songService.setSongs(songs);
        })
      );
  }

}
