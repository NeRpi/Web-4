import { Pipe, PipeTransform } from '@angular/core';
import {Team} from "../team";

@Pipe({
  name: 'searchTeamPipe',
  pure: false
})
export class SearchTeamPipe implements PipeTransform {

  transform(teams: Team[], filterTeams: any[]): any {
    if (!teams || !filterTeams) {
      return teams;
    }

    return teams.filter(team => filterTeams[0](team.country.name.toLowerCase(), filterTeams[1].toLowerCase()));
  }
}
