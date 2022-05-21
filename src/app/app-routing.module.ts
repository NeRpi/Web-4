import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateGameComponent} from "./create-game/create-game.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'createGame', component: CreateGameComponent},
  {path: 'createGame/:country', component: GameComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
