import { Meta } from './../../songs/meta.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Song } from 'src/app/songs/song.model';
import { SongsService } from 'src/app/songs/songs.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  song: Song;
  id: number;

  constructor(private songsService: SongsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.song = this.songsService.getSong(this.id);
        }
      );
  }

  getData(): string[][] {
    return this.song.data;
  }

  getMeta(): Meta {
    return this.song.meta;
  }

  getCurrentUser(): string {
    return localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : null;
  }

}
