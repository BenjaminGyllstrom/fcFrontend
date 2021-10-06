import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from 'src/app/Models/root.model';

@Component({
  selector: 'app-root-list-overview',
  templateUrl: './root-list-overview.component.html',
  styleUrls: ['./root-list-overview.component.scss']
})
export class RootListOverviewComponent implements OnInit {

  @Input() root: Root

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/rootOverview', this.root.id])
  }
}
