import { AuthService } from './../../auth/auth.service';
import { Subject } from 'rxjs';
import { Song } from './../song.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SongsService } from '../songs.service';
import { Meta } from '../meta.model';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  songForm: FormGroup;
  allowSave = false;

  song: Song;

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSave() {
    if (this.editMode) {
      this.songsService.updateSong(this.id, this.songForm);
    } else {
      this.songsService.addSong(this.songForm);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    const currentUser = this.authService.user.value.email;
    if (this.editMode) {
      this.song = this.songsService.getSong(this.id);
    } else {
      const newMeta = new Meta('None', 'AABA', 'lightblue');
      const newData = [['x'],['x'],['x'],['x'],['x'],['x'],['x'],['x']];
      this.song = new Song(currentUser, 'new song', 'new composer', 'key', newData, newMeta);
    }

    this.songForm = new FormGroup({
      owner:  new FormControl(this.song.owner, Validators.required),
      title: new FormControl(this.song.title, Validators.required),
      composer: new FormControl(this.song.composer, Validators.required),
      key: new FormControl(this.song.key, Validators.required),
      data: new FormControl(JSON.stringify(this.song.data), Validators.required),
      meta: new FormControl(JSON.stringify(this.song.meta), Validators.required),
    });
  }

}
