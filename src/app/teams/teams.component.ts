import {Component, OnInit, Input} from '@angular/core';
import {Country, Team} from '../team'
import {TeamService} from "../team.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  isAddTeam: boolean = false;
  isJoinTeam: boolean = false;
  @Input() userName: string = '';

  constructor(private teamService: TeamService,
              private addTeamDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

  addTeam(country: Country): void {
    this.teamService.addTeam({country: country, players: [this.userName]} as Team).subscribe(team => {
      this.teams.push(team);
      this.isAddTeam = true;
      this.isJoinTeam = true;
    });
  }

  joinTeam(team: Team): void {
    team.players.push(this.userName);
    if (team) this.teamService.updateTeam(team).subscribe(response => {});
    this.isJoinTeam = true;
  }

  turnOfCountry(country: Country): void{
    country.isSelect = !country.isSelect;
    this.teamService.updateCountries(country).subscribe(response => {});
  }

  openAddTeamDialog() {
    const dialogRef = this.addTeamDialog.open(AddTeam);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTeam(result);
        this.turnOfCountry(result);
      }
    });
  }
}

@Component({
  templateUrl: './addTeamDialog.html'
})
export class AddTeam {
  countries: Country[] = [];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.teamService.getCountries().subscribe(countries => this.countries = countries.filter(country => !country.isSelect));
  }

  selectCountry: Country | undefined;
}
