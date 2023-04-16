import { Component } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
import { Deck } from '../models/Deck';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent {

  cards: string[] = [];
  decks: Deck[] = [];

  constructor(private route: ActivatedRoute,
    private location: Location,
    private mock: MockObjectsService) { }

  ngOnInit() {
    this.cards = this.mock.getMockObjects();
    this.decks = this.mock.getMockDecks();
  }
}
