import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Root } from 'src/app/Models/root.model';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';

@Component({
  selector: 'app-create-root',
  templateUrl: './create-root.component.html',
  styleUrls: ['./create-root.component.scss']
})
export class CreateRootComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private rootHttpService: RootHttpService) { }

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
    this.rootHttpService.post(root).subscribe()
  }

}
