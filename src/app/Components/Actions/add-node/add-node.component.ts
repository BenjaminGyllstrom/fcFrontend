import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionService, Action } from 'src/app/Services/action.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {

  nodeType:string = 'explain';

  constructor(private urlService: UrlService,
    private route: ActivatedRoute,
    private actionService: ActionService) { }

  ngOnInit(): void {
    if(this.actionService.action == Action.Default){
      this.actionService.setAction(Action.AddNode)
    }
    this.urlService.handleParams(this.route.snapshot.params);
  }
  onNodeChange(nodeType: string){
    this.nodeType = nodeType;
  }
}
