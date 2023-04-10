import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardListComponent } from './card-list/card-list.component';
import { GameSelectorComponent } from './game-selector/game-selector.component';

const routes: Routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: GameSelectorComponent },
  { path: 'cards', component: CardListComponent },
  { path: 'cards/:name', component: CardDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
