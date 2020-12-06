import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Song } from 'src/app/songs/song.model';
import { SongsService } from 'src/app/songs/songs.service';

@Component({
  selector: 'app-public-song-list',
  templateUrl: './public-song-list.component.html',
  styleUrls: ['public-song-list.component.css']
})
export class PublicSongListComponent implements OnInit, OnDestroy {

  songs: Song[];
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private songsService: SongsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataStorageService.fetchSongs().subscribe(); // without fetch menu, get song list
    this.songs = this.songsService.getSongs();
    this.subscription = this.songsService.songsChanged
      .subscribe(
        (songs: Song[]) => {
          this.songs = songs;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
