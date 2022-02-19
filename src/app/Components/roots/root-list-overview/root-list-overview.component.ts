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

  userData: {
    name:string,
    photoUrl:string
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.root.userData){
      this.userData = this.root.userData
    }
  }

  onClick(){
    this.router.navigate(['/rootOverview', this.root.id])
  }
}
