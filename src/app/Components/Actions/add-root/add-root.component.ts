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
    private rootHttpService: RootHttpService,
    private sideBarService: SideBarService) { }

  rootForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
  }

  onSubmit(){
    const title = this.rootForm.value.title;
    const root = new Root();
    root.title = title;

    this.rootForm.reset();
    this.rootHttpService.post(root).subscribe((collectedRoot: IRoot) => {
      const newRoot = this.rootHttpService.parseToRoot(collectedRoot);
      this.sideBarService.addRoot(newRoot);
      // this.router.navigate(['/rootOverview', collectedRoot._id])
    })
  }

}
