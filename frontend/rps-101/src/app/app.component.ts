import { Component } from '@angular/core';
import { MockObjectsService } from './services/mock-objects.service';
import { Deck } from './models/Deck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Janken 101';

  cards: string[] = [];
  decks: Deck[] = [];

  constructor(private mock: MockObjectsService) { }

  ngOnInit() {
    this.cards = this.mock.getMockObjects();
    this.decks = this.mock.getMockDecks();
  }
}
