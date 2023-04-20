import { Component, Inject } from '@angular/core';
import { Deck } from '../models/Deck';
import { DeckApiService } from '../services/deck-api.service';
import { RandomDeckService } from '../services/random-deck.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-deck-selector',
  templateUrl: './deck-selector.component.html',
  styleUrls: ['./deck-selector.component.scss'],
})
export class DeckSelectorComponent {
  autocompleteControl = new FormControl('');
  userDecks!: Deck[];
  randomDeck?: Deck;
  filteredDecks!: Deck[];
  filterProperty: string = 'name';

  constructor(
    private deckApi: DeckApiService,
    private randomDeckService: RandomDeckService,
    public dialogRef: MatDialogRef<DeckSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedDeck?: Deck
  ) {}

  async ngOnInit() {
    this.deckApi.getDecks().subscribe((result) => {
      this.userDecks = result;
    });

    this.randomDeckService.getRandomDeck().subscribe((result) => {
      this.randomDeck = result;
      this.selectedDeck = result;
    });
  }

  selectDeck(deck?: Deck) {
    this.selectedDeck = deck;
  }

  getFiltered(filtered: Deck[]) {
    this.filteredDecks = filtered;
  }
}
