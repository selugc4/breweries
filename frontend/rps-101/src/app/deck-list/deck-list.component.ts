import { Component } from '@angular/core';
import { DeckApiService } from '../services/deck-api.service';
import { Deck } from '../models/Deck';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent {
  autocompleteControl = new FormControl('');
  decks: Deck[] = [];
  filteredDecks: Deck[] = [];
  filterProperty: string = 'name';

  constructor(private deckApi: DeckApiService) {}

  ngOnInit() {
    this.deckApi.getDecks().subscribe((result) => {
      this.decks = result;
    });
  }

  getFiltered(filtered: Deck[]) {
    this.filteredDecks = filtered;
  }
}
