import { ActivatedRoute } from '@angular/router';
import { UrlService } from './../../../Services/url.service';
import { ItemsService } from './../../../Services/items.service';
import { ExplainHttpService } from './../../../Services/Http/ExplainHttp.service';
import { Explain, IExplain } from './../../../Models/explain.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explain-overview',
  templateUrl: './explain-overview.component.html',
  styleUrls: ['./explain-overview.component.scss']
})
export class ExplainOverviewComponent implements OnInit {

  explain:Explain
  edit:boolean;
  content:string

  constructor(
    private sideBarService: SideBarService,
    private explainHttpService: ExplainHttpService,
    private itemService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params, 'explain');

    if(this.sideBarService.selectedNode){
      this.explain = this.sideBarService.selectedNode;
      this.content = this.explain.text;
    }
    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node && node.type == 'explain'){
        this.explain = this.explainHttpService.parseToExplain(node);
        this.content = this.explain.text;
      }
    })
  }

  onQuillClick(){
    this.edit = true;
  }

  onContentChange(content:string){
    this.content = content;
  }

  onSave(){
    this.explain.text = this.content;

    if(this.sideBarService.selectedChapter)
    this.itemService.updateExplain(this.sideBarService.selectedChapter, this.explain).subscribe(()=>this.edit = false)
  }
  onCancel(){
    this.edit = false;
    this.content = this.explain.text;
  }
}
