import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeckSelectorComponent } from '../deck-selector/deck-selector.component';
import { GameMode } from '../models/GameMode';
import { Deck } from '../models/Deck';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent {
  selectedGameMode?: GameMode;
  selectedDeck? : Deck;
  GameMode: typeof GameMode = GameMode; //Necesario para poder trabajar con los valores de la enumeracion

  constructor(private dialog: MatDialog, private gameService: GameService){ }

  selectGameMode(gameMode: GameMode){
    this.selectedGameMode = gameMode;
    const dialogRef = this.dialog.open(DeckSelectorComponent);

    dialogRef.afterClosed().subscribe((deck) => {
      this.selectedDeck = deck;

      if (this.selectedDeck){
        this.gameService.startGame(this.selectedGameMode!, this.selectedDeck);
      }
    });
  }
}

