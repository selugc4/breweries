import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardListComponent } from './card-list/card-list.component';
import { GameSelectorComponent } from './game-selector/game-selector.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'decks', component: DeckListComponent },
  { path: 'decks/:deckId/details', component: DeckDetailComponent },
  { path: 'decks/create', component: DeckBuilderComponent},
  { path: 'decks/:deckId/edit', component: DeckBuilderComponent },
  { path: 'play', component: GameSelectorComponent },
  { path: 'cards', component: CardListComponent },
  { path: 'cards/:name', component: CardDetailComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
