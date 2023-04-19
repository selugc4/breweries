import { Component } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
import { Deck } from '../models/Deck';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.scss'],
})
export class DeckBuilderComponent {
  autocompleteControl = new FormControl('');
  typeName: string = 'EDITION';
  mainCardName: string = '';
  cards: string[] = [];
  filteredCards: string[] = [];
  deck!: Deck;
  deckCards: string[] = [];
  error: string =
    'ERROR : El nombre de la baraja no debe superar los 50 caracteres';
  requestFailed: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mock: MockObjectsService
  ) {}

  ngOnInit() {
    const deckId = this.route.snapshot.paramMap.get('deckId');
    if (deckId) {
      this.deck = this.mock
        .getMockDecks()
        .find((x) => x.id == parseInt(String(deckId)))!;
      this.deckCards = this.deck.cards;
      this.mainCardName = this.deck.cards[0];
    } else {
      this.typeName = 'CREATION';
    }
    this.cards = this.mock.getMockObjects();
  }

  onAdd(card: string) {
    if (!this.deckCards.includes(card) && this.deckCards.length < 5)
      this.deckCards.push(card);

    this.mainCardName = this.deckCards[0].toLowerCase();
  }

  onDelete(card: string) {
    this.deckCards.splice(this.deckCards.indexOf(card), 1);

    if (this.deckCards.length == 0) {
      this.mainCardName = '';
    } else {
      this.mainCardName = this.deckCards[0].toLowerCase();
    }
  }

  onSave() {
    //falta código de adición a BD
    this.router.navigate([`/decks/${this.deck.id}/details`]);
  }

  onCancel() {
    if (this.deck) this.router.navigate([`/decks/${this.deck.id}/details`]);
    else this.router.navigate([`/decks`]);
  }

  getFiltered(filtered: string[]) {
    this.filteredCards = filtered;
  }

  drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(
      $event.container.data,
      $event.previousIndex,
      $event.currentIndex)
    this.mainCardName = this.deckCards[0].toLowerCase();
  }
}
