import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-home-circle',
  templateUrl: './home-circle.component.html',
  styleUrls: ['./home-circle.component.scss']
})
export class HomeCircleComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  onClick(node:any){

  }

  calculateDeg(index:any){
    const degree = index * 72;
    return `rotate(${degree}deg) translate(175px) rotate(-${degree}deg)`;
  }


}
