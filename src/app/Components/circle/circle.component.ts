import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {

  constructor() { }


  @Input() nodes:any;
  @Input() degreeMultiplier:number = 25;
  @Input() diameter:number = 500;


  @Output("nodeClicked") onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }


  calculateDeg(node:any){
    const index = this.nodes.indexOf(node);
    const degree = index * this.degreeMultiplier;

    // return `rotate(${degree}deg) translate(250px) rotate(-${degree}deg)`;
    return `rotate(${degree}deg) translate(${this.diameter/2}px) rotate(-${degree}deg)`;
  }

  getHeight(){
    return "this.diameter px"
  }
  getWidth(){
    return "this.diameter px"
  }

  onClick(node:any){
    this.onClickEmitter.emit(node);
  }
}
