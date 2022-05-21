export interface Team{
  id: number;
  country: Country;
  players: string[];
  rootUser: string;
}

export interface Country {
  name: string;
  towns: string[];
  isSelect: boolean;
}
