import { Component, Inject } from '@angular/core';
import { Deck } from '../models/Deck';
import { MockObjectsService } from '../services/mock-objects.service';
import { RandomDeckService } from '../services/random-deck.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-selector',
  templateUrl: './deck-selector.component.html',
  styleUrls: ['./deck-selector.component.scss'],
})
export class DeckSelectorComponent {
  userDecks?: Deck[];
  randomDeck?: Deck;

  constructor(
    private mock: MockObjectsService,
    private randomDeckService: RandomDeckService,
    public dialogRef: MatDialogRef<DeckSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedDeck?: Deck
  ) {}

  ngOnInit() {
    this.userDecks = this.mock.getMockDecks();
    this.randomDeck = this.randomDeckService.getRandomDeck();
    this.selectedDeck = this.randomDeck;
  }

  selectDeck(deck?: Deck) {
    this.selectedDeck = deck;
  }
}
