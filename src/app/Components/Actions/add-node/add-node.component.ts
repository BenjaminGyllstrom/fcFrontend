import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {

  nodeType:string = 'explain';

  constructor(private urlService: UrlService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params);
  }
  onNodeChange(nodeType: string){
    this.nodeType = nodeType;
  }
}
