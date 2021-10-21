import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Explain } from 'src/app/Models/explain.model';

@Component({
  selector: 'app-explain-list-overview',
  templateUrl: './explain-list-overview.component.html',
  styleUrls: ['./explain-list-overview.component.scss']
})
export class ExplainListOverviewComponent implements OnInit {

  @Input() explain: Explain;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onClick(){
    this.router.navigate(['/explainOverview', this.explain.id])
  }
}
