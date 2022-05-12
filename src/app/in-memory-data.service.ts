import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {count} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teams = [
      {
        id: 1,
        country: {name: 'Беларусь', towns: ['Минск', 'Брест', 'Гомель', 'Витебск']},
        players: ['Дима', 'Глеб', 'Сева', 'КириллKKKKKKKK']
      },
    ]

    const countries = [
      {id: 1, name: 'Россия', towns: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Нижний Новгород'], isSelect: false},
      {id: 2, name: 'Испания', towns: ['Мадрид', 'Санкт-Петербург', 'Новосибирск', 'Нижний Новгород'], isSelect: false}
    ]
    return {teams, countries};
  }

  constructor() {
  }
}
