import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Root, IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-root',
  templateUrl: './add-root.component.html',
  styleUrls: ['./add-root.component.scss']
})
export class AddRootComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute) { }

  rootForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params);
  }

  onSubmit(){
    const title = this.rootForm.value.title;
    const root = new Root();
    root.title = title;

    this.rootForm.reset();

    this.itemsService.postRoot(root).subscribe()
  }

}
