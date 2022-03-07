import { Explain } from './../../../Models/explain.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explain-overview',
  templateUrl: './explain-overview.component.html',
  styleUrls: ['./explain-overview.component.scss']
})
export class ExplainOverviewComponent implements OnInit {

  explain:Explain

  constructor(
    private sideBarService: SideBarService
    ) { }

  ngOnInit(): void {
    this.explain = this.sideBarService.selectedNode;
  }

}
