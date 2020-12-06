import { Song } from './../songs/song.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAscending',
  pure: false
})
export class SortAscendingPipe implements PipeTransform {

  transform(value: Song[]): Song[] {
    return value.sort((a, b) => this.compare(a, b));
  }

  compare( a: Song, b: Song ) {
    if ( a.title < b.title ) {
      return -1;
    }
    if ( a.title > b.title  ) {
      return 1;
    }
    return 0;
  }

}
