import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {

  nodeType:string = 'explain';

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
  }
  onNodeChange(nodeType: string){
    this.nodeType = nodeType;
  }

  onNav(action:string){
    if(action == 'Overview'){
      this.router.navigate(['../../', action], {relativeTo: this.route})
    }else{
      this.router.navigate(['../'], {relativeTo: this.route})
    }
  }
}
