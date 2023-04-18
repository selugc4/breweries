import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { DeckComponent } from './deck/deck.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { NumCircleComponent } from './num-circle/num-circle.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardListComponent } from './card-list/card-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { GameSelectorComponent } from './game-selector/game-selector.component';
import { DeckSelectorComponent } from './deck-selector/deck-selector.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameComponent } from './game/game.component';
import { CardGameDetailComponent } from './card-game-detail/card-game-detail.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GameEndComponent } from './game-end/game-end.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScoreboardRoundComponent } from './scoreboard-round/scoreboard-round.component';
import { RoundResultComponent } from './round-result/round-result.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DeckComponent,
    DeckListComponent,
    DeckDetailComponent,
    NumCircleComponent,
    DeleteDialogComponent,
    DeckBuilderComponent,
    CardListComponent,
    CardDetailComponent,
    HeaderComponent,
    MenuComponent,
    GameSelectorComponent,
    DeckSelectorComponent,
    GameComponent,
    CardGameDetailComponent,
    InstructionsComponent,
    ScoreboardComponent,
    GameEndComponent,
    NotFoundComponent,
    AutocompleteComponent,
    ScoreboardRoundComponent,
    RoundResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
