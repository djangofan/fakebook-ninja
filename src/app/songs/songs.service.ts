import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Song } from './song.model';

export interface Branch {
  salesperson: string;
  telephone: string;
  address: string;
  stock: any[]
}

@Injectable()
export class SongsService {

  LOCAL_STORAGE_KEY = 'songData';
  songsChanged = new Subject<Song[]>();
  private songs: Song[] = [];

  constructor() {}

  setSongs(songs: Song[]) {
    this.songs = songs;
    this.songsChanged.next(this.songs.slice());
    this.saveSongsToLocalStorage(this.songs);
  }

  getSongs() {
    if (this.songs) {
      return this.sortSongs(this.songs);
    } else {
      this.updateSongsFromLocalStorage();
      return this.songs;
    }
  }

  getSong(index: number): Song {
    return this.songs[index];
  }

  addSong(newSong: FormGroup) {
    const song = this.convertFormToSong(newSong.value);
    this.songs.push(song);
    this.songsChanged.next(this.sortSongs(this.songs));
    this.saveSongsToLocalStorage(this.songs);
    console.log('Added song.', song);
  }

  updateSong(index: number, newSong: FormGroup) {
    const song = this.convertFormToSong(newSong.value);
    this.songs[index] = song;
    const copyOfSongs = this.sortSongs(this.songs);
    this.songsChanged.next(copyOfSongs);
    this.saveSongsToLocalStorage(copyOfSongs);
    console.log('Updated song.', song);
  }

  private convertFormToSong(rawSong: {owner: string, title: string, composer: string,
    key: string, data: string, meta: string, published: boolean}): Song {
    return new Song(rawSong.owner, rawSong.title, rawSong.composer,
      rawSong.key, JSON.parse(rawSong.data), JSON.parse(rawSong.meta), rawSong.published);
  }

  deleteSong(index: number) {
    this.songs.splice(index, 1);
    this.songsChanged.next(this.sortSongs(this.songs));
    this.saveSongsToLocalStorage(this.songs);
  }

  saveSongsToLocalStorage(songs: Song[]) {
    if (songs.length > 0) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(songs));
    }
  }

  updateSongsFromLocalStorage() {
    const cachedSongs = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (cachedSongs && cachedSongs.length > 0) {
      this.songs = this.sortSongs(JSON.parse(cachedSongs));
    } else {
      console.log('You song list in local storage was empty.');
    }
  }

  sortSongs(songs: Song[]) {
    return songs.slice().sort((a, b) => this.compare(a, b));
  }

  compare( a: Song, b: Song ) {
    if ( a.title.toLowerCase() < b.title.toLowerCase() ) {
      return -1;
    }
    if ( a.title.toLowerCase() > b.title.toLowerCase()  ) {
      return 1;
    }
    if ( a.title.toLowerCase() === b.title.toLowerCase() ) {
      if ( a.key.toLowerCase() < b.key.toLowerCase() ) {
        return -1;
      }
      if ( a.key.toLowerCase() > b.key.toLowerCase()  ) {
        return 1;
      }
    }
    return 0;
  }

}
