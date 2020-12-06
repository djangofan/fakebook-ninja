import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-start',
  template: `
    <div>
      <p>Please select a Song on the left.</p>
      <p>If you don't see any songs listed to the left, use the 'Manage' menu to fetch your songs.</p>
    </div>
  `,
  styles: []
})
export class SongStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
