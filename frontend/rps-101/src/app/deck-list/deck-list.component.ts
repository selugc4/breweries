import { Component } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private mock: MockObjectsService
  ) {}

  ngOnInit() {
    this.decks = this.mock.getMockDecks();
  }

  getFiltered(filtered: Deck[]) {
    this.filteredDecks = filtered;
  }
}
