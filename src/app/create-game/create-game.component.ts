import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  getUserName: string = '';
  constructor(private route: ActivatedRoute,
              private location: Location,
              private userDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.openUserNameDialog();
  }

  goBack() {
    this.location.back();
  }

  openUserNameDialog() {
    const dialogRef = this.userDialog.open(UserNameDialog, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      this.getUserName = result;
    });
  }
}

@Component({
  templateUrl: './userNameDialog.html'
})
export class UserNameDialog {
  userName: string = '';
}
