import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['song-list.component.css']
})
export class SongListComponent implements OnInit, OnDestroy {

  songs: Song[];
  subscription: Subscription;

  constructor(private songsService: SongsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.songs = this.songsService.getSongs();
    this.subscription = this.songsService.songsChanged
      .subscribe(
        (songs: Song[]) => {
          this.songs = songs;
        }
      );
  }

  onNewSong() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
