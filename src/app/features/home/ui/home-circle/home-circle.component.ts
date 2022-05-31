import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-home-circle',
  templateUrl: './home-circle.component.html',
  styleUrls: ['./home-circle.component.scss']
})
export class HomeCircleComponent implements OnInit {


  clickedNode: number = 1

  middleSources=[
    "../../../../assets/images/Qustion1.svg",
    "../../../../assets/images/Answer1.svg",
    "../../../../assets/images/social-icon1.png",
  ]
  middleSource:string = "../../../../assets/images/Qustion1.svg";
  middleClicked:boolean

  constructor() {

  }

  ngOnInit(): void {
  }

  onClick(nodeIndex:any){
    this.clickedNode = nodeIndex;
    this.middleClicked = false;

    if(this.clickedNode == 1){
      this.middleSource = this.middleSources[0];
    }
    else if(this.clickedNode == 2){
      this.middleSource = this.middleSources[2];
    }
    else if(this.clickedNode == 3){
      this.middleSource = this.middleSources[0];
    }
    else if(this.clickedNode == 4){
      this.middleSource = this.middleSources[2];
    }
    else if(this.clickedNode == 5){
      this.middleSource = this.middleSources[0];
    }
  }
  onMiddleClicked(){
    this.middleClicked = !this.middleClicked;

    if(this.clickedNode == 1){
      if(this.middleClicked){
        this.middleSource = this.middleSources[1];
      }else{
        this.middleSource = this.middleSources[0];
      }
    }
    if(this.clickedNode == 3){
      if(this.middleClicked){
        this.middleSource = this.middleSources[1];
      }else{
        this.middleSource = this.middleSources[0];
      }
    }
    if(this.clickedNode == 5){
      if(this.middleClicked){
        this.middleSource = this.middleSources[1];
      }else{
        this.middleSource = this.middleSources[0];
      }
    }
  }

  calculateDeg(index:any){
    const degree = index * 72;
    return `rotate(${degree}deg) translate(175px) rotate(-${degree}deg)`;
  }

  getBackground(nodeIndex:number){
    if(nodeIndex == this.clickedNode){
      return "radial-gradient(80px, #535DC5, transparent 50%)"
    }
    else{
      return "none"
    }
  }
}
