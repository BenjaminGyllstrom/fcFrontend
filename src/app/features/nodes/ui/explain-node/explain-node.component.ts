import { Component, Input, OnInit } from '@angular/core';
import { Explain } from 'src/app/Models/explain.model';

@Component({
  selector: 'app-explain-node',
  templateUrl: './explain-node.component.html',
  styleUrls: ['./explain-node.component.scss']
})
export class ExplainNodeComponent implements OnInit {

  @Input() explain: Explain
  @Input() standardBackground:boolean

  isLocked:boolean;
  finnished:boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLocked = this.explain.locked;
    this.finnished = !this.explain.new;
  }

  onClick(){
    // this.router.navigate(['/studyExplain', this.explain.id])
  }

  getBackgroundColor():string{
    if(this.standardBackground) return 'rgba(238, 238, 238, .5)'

    if(this.finnished) return 'rgba(169, 240, 185, .5)'
    if(this.isLocked) return 'rgba(238, 238, 238, .5)'
    if(this.explain.new) return 'rgba(240, 229, 169, .5)'


    // if(this.explain.new) return '#EEEEEE'


    // return '#F9F5EC'

    // // if(this.sideBarService.editMode) return '#F9F5EC'

    // if(this.isLocked) return '#BCBCBC'
    // if(this.finnished) return '#BEDB81'
    return 'white';
  }
  getBorder(){
    if(this.standardBackground) return 'rgba(238, 238, 238, .5)'

    if(this.finnished) return '1px solid rgba(7, 109, 30, .2)'
    if(this.isLocked) return '1px solid rgba(83, 83, 83, .2)'
    if(this.explain.new) return '1px solid rgba(109, 99, 7, .2)'


    return '2px solid black'
    // if(this.sideBarService.editMode) return '2px solid black'
    return 'none'
  }
}
