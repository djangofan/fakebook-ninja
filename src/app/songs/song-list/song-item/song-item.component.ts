import { Component, OnInit, Input } from '@angular/core';

import { Song } from '../../song.model';

@Component({
  selector: 'app-song-item',
  template: `
    <a
      style="cursor: pointer;"
      [routerLink]="[index]"
      routerLinkActive="active"
      class="list-group-item clearfix">
      <div class="pull-left">
      <h4 class="list-group-item-heading">{{ song.title }} ({{ song.key }})</h4>
      <h5 class="list-group-item-heading">{{ song.composer }}</h5>
      </div>
    </a>
  `,
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {

  @Input() song: Song;
  @Input() index: number;

  ngOnInit() {
  }

}
