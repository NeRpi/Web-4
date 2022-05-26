import {Component, OnInit, Input, Inject, EventEmitter, Output} from '@angular/core';
import {Country, Team} from '../team'
import {TeamService} from "../team.service";
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  isAddTeam: boolean = false;
  @Output() getCountry = new EventEmitter<Country>();
  country: Country | undefined;
  @Input() userName: string = '';
  @Input() soughtTeam: string = '';

  constructor(private teamService: TeamService, private addTeamDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

  addTeam(country: Country): void {
    this.teamService.addTeam({country: country, players: [this.userName], rootUser: this.userName} as Team)
      .subscribe(team => {
        this.teams.push(team);
        this.isAddTeam = true;
        this.country = country;
      });
  }

  joinTeam(team: Team): void {
    team.players.push(this.userName);
    if (team) this.teamService.updateTeam(team).subscribe();
    this.country = team.country;
  }

  switchOffTeam(team: Team): void {
    if (team.players.length != 1) {
      team.players = team.players.filter(n => n != this.userName)
      team.rootUser = team.players[0];
      this.teamService.updateTeam(team).subscribe();
      this.country = undefined;
    } else
      this.deleteTeam(team);
  }

  deleteTeam(team: Team): void {
    this.teamService.deleteTeam(team).subscribe();
    this.teams = this.teams.filter(t => t != team);
    this.turnOfCountry(team.country);
    this.isAddTeam = false;
    this.country = undefined;
  }

  turnOfCountry(country: Country): void {
    country.isSelect = !country.isSelect;
    this.teamService.updateCountries(country).subscribe();
  }

  searchTeam(teamName: string, soughtTeam: string): boolean {
    if (soughtTeam == '' || soughtTeam == null) {
      return true;
    }

    return (teamName.indexOf(soughtTeam) !== -1);
  }

  openAddTeamDialog(): void {
    const dialogRef = this.addTeamDialog.open(AddTeam);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.turnOfCountry(result);
        this.addTeam(result);
      }
    });
  }

  openEditCountryDialog(selectTeam: Team): void {
    const dialogRef = this.addTeamDialog.open(EditTeam, {
      data: {
        country: selectTeam.country.name,
        isJoin: this.country != undefined,
        isRoot: this.userName == selectTeam.rootUser,
        isUserCountry: this.country?.name == selectTeam.country.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 0:
          this.joinTeam(selectTeam);
          break;
        case 1:
          this.switchOffTeam(selectTeam);
          break;
        case 2:
          this.deleteTeam(selectTeam);
          break;
        case 3:
          this.switchOffTeam(this.teams.find((team) => {
            return team.country.name == this.country?.name;
          })!);
          this.joinTeam(selectTeam);
          break;
      }
    });
  }
}

@Component({
  templateUrl: './addTeamDialog.html'
})
export class AddTeam {
  countries: Country[] = [];
  selectCountry: Country | undefined;

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.teamService.getCountries().subscribe(countries => this.countries = countries.filter(country => !country.isSelect));
  }
}

@Component({
  templateUrl: './editTeamDialog.html'
})
export class EditTeam {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { country: string, isJoin: boolean, isRoot: boolean, isUserCountry: boolean }) {
  }

  editTeam(editMode: number): number {
    return editMode;
  }
}
