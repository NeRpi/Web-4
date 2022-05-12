export interface Team{
  country: Country;
  players: string[];
}

export interface Country {
  name: string;
  towns: string[];
  isSelect: boolean;
}
