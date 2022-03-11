import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Explain } from 'src/app/Models/explain.model';

@Component({
  selector: 'app-explain-node',
  templateUrl: './explain-node.component.html',
  styleUrls: ['./explain-node.component.scss']
})
export class ExplainNodeComponent implements OnInit {

  @Input() explain: Explain

  isLocked:boolean;
  finnished:boolean;

  constructor(private router: Router,
    private sideBarService: SideBarService
    ) { }

  ngOnInit(): void {
    this.isLocked = this.explain.locked;
    this.finnished = !this.explain.new;
  }

  onClick(){
    this.router.navigate(['/studyExplain', this.explain.id])
  }

  getBackgroundColor():string{
    if(this.sideBarService.editMode) return '#F9F5EC'

    if(this.isLocked) return '#BCBCBC'
    if(this.finnished) return '#BEDB81'
    return 'white';
  }
  getBorder(){
    if(this.sideBarService.editMode) return '2px solid black'
    return 'none'
  }
}
