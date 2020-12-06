import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './song.model';

@Pipe({
  name: 'sortAscending',
  pure: false
})
export class SortAscendingPipe implements PipeTransform {

  transform(value: Song[]): Song[] {
    console.log('Sort ascending');
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
