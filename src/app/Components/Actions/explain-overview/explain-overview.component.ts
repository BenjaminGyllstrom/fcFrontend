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
    private explainHttpService: ExplainHttpService
    ) { }

  ngOnInit(): void {
    this.explain = this.sideBarService.selectedNode;
    this.content = this.explain.text;
    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node && node.type == 'explain'){
        this.explain = node;
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
    this.explainHttpService.edit(this.explain, this.explain.id).subscribe((collectedExplain:IExplain)=>{
      const updatedExplain = this.explainHttpService.parseToExplain(collectedExplain);
      this.edit = false;
    });
  }
  onCancel(){
    this.edit = false;
    this.content = this.explain.text;
  }
}
