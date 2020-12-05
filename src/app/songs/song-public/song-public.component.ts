import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meta } from '../meta.model';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-public',
  templateUrl: './song-public.component.html',
  styleUrls: ['./song-public.component.css']
})
export class SongPublicComponent implements OnInit {

  song: Song;
  id: number;

  constructor(private songsService: SongsService,
              private route: ActivatedRoute,
              private router: Router) {
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

}
