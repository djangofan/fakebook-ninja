import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chords'
})
export class ChordsPipe implements PipeTransform {

  transform(values, args: string): string[][] {
    let measures;
    try {
      measures = JSON.parse(values);
    } catch(e) {
      alert('Song structure is ill formatted.  You may need to delete this song.\n' + e);
    }
    const keys = [];
    measures.forEach(measure => {
      if (measure.length === 1) {
        keys.push(measure[0]);
      } else if (measure.length === 2) {
        keys.push(measure[0] + ' / ' + measure[1]);
      } else if (measure.length === 4) {
        keys.push(measure[0] + ' / ' + measure[1] + ' / ' + measure[2] + ' / ' + measure[3]);
      }
    });
    return keys;
  }

}
