import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  getUserName: string = '';
  constructor(private location: Location,
              private userDialog: MatDialog,
              private clipboard: Clipboard,
              private router: Router) {
  }

  ngOnInit(): void {
    this.openUserNameDialog();
  }

  goBack(): void {
    this.location.back();
  }

  startGame(): void {
    this.router.navigateByUrl('/createGame/Беларусь', {state: {id: '1'}});
  }

  copyLink(): void {
    this.clipboard.copy('http://localhost:4200/createGame');
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
