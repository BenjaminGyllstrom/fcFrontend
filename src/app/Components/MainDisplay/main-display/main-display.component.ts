import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {

  @Input() page:string;


  constructor() { }

  ngOnInit(): void {
  }

}
