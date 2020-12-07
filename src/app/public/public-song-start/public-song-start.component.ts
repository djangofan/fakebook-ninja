import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-song-start',
  template: `
    <div>
      <p>Please select a Song on the left.</p>
    </div>
  `,
  styles: []
})
export class PublicSongStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
