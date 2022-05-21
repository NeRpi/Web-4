import {Injectable} from '@angular/core';
import {Country, Team} from "./team";
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUrl = 'api/teams';
  private countriesUrl = 'api/countries';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.getTeams();
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl).pipe(catchError(this.handleError<Team[]>('getTeams', [])));
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl).pipe(catchError(this.handleError<Country[]>('getTeams', [])));
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, team, this.httpOptions).pipe(catchError(this.handleError<Team>('addTeam')));
  }

  updateTeam(team: Team): Observable<any> {
    return this.http.put(this.teamsUrl, team, this.httpOptions).pipe(catchError(this.handleError<any>('updateTeam')));
  }

  updateCountries(country: Country): Observable<any> {
    return this.http.put(this.countriesUrl, country, this.httpOptions).pipe(catchError(this.handleError<any>('updateCountry')));
  }

  deleteTeam(team: Team): Observable<Team>{
    const url = `${this.teamsUrl}/${team.id}`;
    return this.http.delete<Team>(url, this.httpOptions).pipe(catchError(this.handleError<Team>('deleteTeam')));
  }

  handleError<T>(opertion = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
