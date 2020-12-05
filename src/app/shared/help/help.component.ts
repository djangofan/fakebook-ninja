import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: max-line-length
  data: string = JSON.parse('{"bSplit":100,"background":"#cce6ff","borderColor":"2px solid black","cSplit":100,"cellColor":"#9fa8da","description":"None","dividerColor":"black","fontColor":"darkblue","form":""}');

  ngOnInit(): void {
  }

}
