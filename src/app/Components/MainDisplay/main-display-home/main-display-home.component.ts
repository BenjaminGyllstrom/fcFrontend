import { LogInComponent } from './../../Profile/log-in/log-in.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-display-home',
  templateUrl: './main-display-home.component.html',
  styleUrls: ['./main-display-home.component.scss']
})
export class MainDisplayHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onSignUp(){

    const dialogRef = this.dialog.open(LogInComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
