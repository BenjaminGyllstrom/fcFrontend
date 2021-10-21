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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/studyExplain', this.explain.id])
  }
}
