import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-explain-overview',
  templateUrl: './explain-overview.component.html',
  styleUrls: ['./explain-overview.component.scss']
})
export class ExplainOverviewComponent implements OnInit {

  explain : Explain

  constructor(private route: ActivatedRoute, private router: Router, private explainHttpService: ExplainHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.explainHttpService.getById(id).subscribe((collectedExplain: IExplain) => {
      this.explain = this.explainHttpService.parseToExplain(collectedExplain);
    });
  }

  onDelete(){
    this.explainHttpService.delete(this.explain.id).subscribe(() => {
      this.router.navigate(['/chapterOverview', this.explain.parentId])
    });
  }

  onEdit(){
    this.router.navigate(['editExplain', this.explain.id])
  }
}
