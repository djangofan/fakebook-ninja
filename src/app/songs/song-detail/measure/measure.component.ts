import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-measure',
  template: `
    <div>
      <canvas #canvas id="canvas-{{ measureNumber }}" width="100px" height="100px"></canvas>
    </div>
  `,
  styles: ['div canvas { padding: 0; margin: auto; display: block; }']
})
export class MeasureComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D;

  @Input() cellChords: string;
  @Input() measureNumber: number;
  @Input() fontColor: string;
  @Input() dividerColor: string;

  FONT_STYLE = 'Helvetica';
  XSMALL = '12px ' + this.FONT_STYLE;
  SMALL = '14px ' + this.FONT_STYLE;
  MEDIUM = '20px ' + this.FONT_STYLE;
  LARGE = '24px ' + this.FONT_STYLE;

  constructor() { }

  ngOnInit(): void {
    //console.log('cell: ', this.cellChords);
    this.drawCell();
  }

  public getChordsArray(): string[] {
    return this.cellChords.split(',');
  }

  private isBlank(input: string): boolean {
    return (!input || /^\s*$/.test(input));
  }

  drawCell(): void {
    console.log('font color: ', this.fontColor);
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.fillStyle = this.fontColor;
    const chordsArr = this.getChordsArray();
    if ( chordsArr.length === 4 ) {
      this.drawForwardDiagonal();
      if ( !this.isBlank(chordsArr[0]) && !this.isBlank(chordsArr[1]) ) {
        this.drawTopLeftSplit();
        const firstChord = chordsArr[0];
        this.textLeft1(firstChord, this.SMALL);
        const secondChord = chordsArr[1];
        this.textTop2(secondChord, this.SMALL);
      } else {
        const theChord = this.isBlank(chordsArr[0]) ? chordsArr[1] : chordsArr[0];
        this.textUpperLeft(theChord, this.MEDIUM);
      }
      if ( !this.isBlank(chordsArr[2]) && !this.isBlank(chordsArr[3]) ) {
        this.drawBottomRightSplit();
        const thirdChord = chordsArr[2];
        this.textBottom3(thirdChord, this.SMALL);
        const fourthChord = chordsArr[3];
        this.textRight4(fourthChord, this.SMALL);
      } else {
        const theChord = this.isBlank(chordsArr[2]) ? chordsArr[3] : chordsArr[2];
        this.textLowerRight(theChord, this.MEDIUM);
      }
    } else if ( chordsArr.length === 2 ) {
      this.drawForwardDiagonal();
      const firstChord = chordsArr[0];
      this.textUpperLeft(firstChord, this.MEDIUM);
      const secondChord = chordsArr[1];
      this.textLowerRight(secondChord, this.MEDIUM);
    } else if ( chordsArr.length === 1 ) {
      this.textCenter(chordsArr[0], this.LARGE);
    } else {
      this.textCenter('%', this.LARGE);
    }

    this.drawCodaOne(this.XSMALL);
  }

  // 1 method for no cell split

  textCenter(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    const ypos = 58;
    if ( text.length <= 2) {
      this.context.fillText(text, 38, ypos);
    } else if ( text.length <= 4 && text.length > 2 ) {
      this.context.fillText(text, 24, ypos);
    } else if ( text.length <= 6 && text.length > 4 ) {
      this.context.fillText(text, 12, ypos);
    } else {
      this.context.fillText(text, 8, ypos);
    }
  }

  // 2 methods for half split cells

  textUpperLeft(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 2) {
      this.context.fillText(text, 14, 30);
    } else if ( text.length > 2 && text.length <= 5 ) {
      this.context.fillText(text, 10, 28);
    } else {
      this.context.fillText(text, 4, 22);
    }
  }

  textLowerRight( text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 2) {
      this.context.fillText(text, 56, 86);
    } else if ( text.length <= 4 && text.length > 2 ) {
      this.context.fillText(text, 46, 86);
    } else {
      this.context.fillText(text, 36, 90);
    }
  }

  // 4 methods for quarter split cells, in order of appearance

  textLeft1(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 3) {
      this.context.fillText(text, 6, 52);
    } else {
      this.context.fillText(text, 4, 52);
    }
  }

  textTop2(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 3) {
      this.context.fillText(text, 36, 10);
    } else {
      this.context.fillText(text, 16, 10);
    }
  }

  textBottom3(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 3) {
      this.context.fillText(text, 36, 90);
    } else {
      this.context.fillText(text, 26, 90);
    }
  }

  textRight4(text: string, font: string): void {
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    if ( text.length <= 3) {
      this.context.fillText(text, 68, 54);
    } else if ( text.length > 3 && text.length < 6 ) {
      this.context.fillText(text, 72, 54);
    } else {
      this.context.font = this.XSMALL;
      this.context.fillText(text, 56, 54);
    }
  }

  // 3 methods to draw lines in cell

  drawForwardDiagonal(): void {
    this.context.strokeStyle = this.dividerColor;
    this.context.beginPath();
    this.context.moveTo(2, 100);
    this.context.lineTo(96, 2);
    this.context.stroke();
  }

  drawBottomRightSplit(): void {
    this.context.strokeStyle = this.dividerColor;
    this.context.beginPath();
    this.context.moveTo(50, 50);
    this.context.lineTo(100, 100);
    this.context.stroke();
  }

  drawTopLeftSplit(): void {
    this.context.strokeStyle = this.dividerColor;
    this.context.beginPath();
    this.context.moveTo(50, 50);
    this.context.lineTo(0, 0);
    this.context.stroke();
  }

  // 2 methods to draw coda

  drawCodaOne(font: string): void {
    this.context.strokeStyle = this.dividerColor;
    this.context.beginPath();
    this.context.moveTo(6, 6);
    this.context.lineTo(6, 25);
    this.context.stroke();
    this.context.moveTo(6, 6);
    this.context.lineTo(44, 6);
    this.context.stroke();
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    this.context.fillText('1.', 12, 20);
  }

  drawCodaTwo(font: string): void {
    this.context.strokeStyle = this.dividerColor;
    this.context.beginPath();
    this.context.moveTo(6, 6);
    this.context.lineTo(6, 25);
    this.context.stroke();
    this.context.moveTo(6, 6);
    this.context.lineTo(44, 6);
    this.context.stroke();
    this.context.font = font;
    this.context.fillStyle = this.fontColor;
    this.context.fillText('2.', 12, 20);
  }

}
