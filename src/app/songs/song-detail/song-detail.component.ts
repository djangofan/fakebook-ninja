import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Meta } from '../meta.model';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  song: Song;
  id: number;

  constructor(private songsService: SongsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
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

  onEditSong() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteSong() {
    this.songsService.deleteSong(this.id);
    this.router.navigate(['/songs']);
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
