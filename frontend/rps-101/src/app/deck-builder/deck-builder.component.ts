import { Component } from '@angular/core';
import { DeckApiService } from '../services/deck-api.service';
import { CardApiService } from '../services/card-api.service';
import { Deck } from '../models/Deck';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { onExit } from '../guards/exit.guard';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.scss'],
})
export class DeckBuilderComponent implements onExit {
  autocompleteControl = new FormControl('');
  typeName: string = 'EDITION';
  error: string = "ERROR : Deck name can't be over 50 characters.";
  requestFailed: boolean = false;

  mainCardName: string = '';
  cards: string[] = [];
  filteredCards: string[] = [];
  deck!: Deck;
  deckCards: string[] = [];

  deckName: string = '';

  deckId!: number;
  unsavedChanges: boolean = true;
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deckApi: DeckApiService,
    private cardApi: CardApiService
  ) {}

  ngOnInit() {
    this.deckId = parseInt(String(this.route.snapshot.paramMap.get('deckId')));

    if (this.deckId) {
      this.deckApi.getDeck(this.deckId).subscribe((result) => {
        this.deck = result;
        this.deckCards = structuredClone(result.cards);
        this.deckName = result.name;
        this.mainCardName = result.cards[0];
      });
    } else {
      this.typeName = 'CREATION';
    }

    this.cardApi.getCards().subscribe((result) => {
      this.cards = result;
      this.isLoading = false;
    });
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
    if (!this.canSave()) return;

    this.unsavedChanges = false;

    if (this.deckId) {
      this.deck.name = this.deckName;
      this.deck.cards = this.deckCards;

      this.deckApi.updateDeck(this.deckId, this.deck).subscribe((response) => {
        //TODO: Validar response
      });
      this.router.navigate([`/decks/${this.deck.id}/details`]);
    } else {
      this.deck = {
        id: -1,
        name: this.deckName,
        cards: this.deckCards,
        wins: 0,
        draws: 0,
        loses: 0,
      };
      this.deckApi.addDeck(this.deck).subscribe((response) => {
        //TODO: Validar response
        const addedDeck = response;
        this.router.navigate([`/decks/${addedDeck.id}/details`]);
      });
    }
  }

  onCancel() {
    this.unsavedChanges = false;
    if (this.deck) this.router.navigate([`/decks/${this.deck.id}/details`]);
    else this.router.navigate([`/decks`]);
  }

  canSave(): boolean {
    return this.deckName.trim().length > 0 && this.deckCards.length == 5;
  }

  getFiltered(filtered: string[]) {
    this.filteredCards = filtered;
  }

  drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(
      $event.container.data,
      $event.previousIndex,
      $event.currentIndex
    );
    this.mainCardName = this.deckCards[0].toLowerCase();
  }

  onExit() {
    if (!this.unsavedChanges) return true;

    if (!this.deck && this.deckName === '' && this.deckCards.length == 0) {
      return true;
    }

    if (
      this.deck &&
      this.deck.name === this.deckName &&
      this.deck.cards.toString() === this.deckCards.toString()
    ) {
      return true;
    }

    const confirmExit = confirm(
      'You have unsaved changes on the deck. Are you sure you want to leave?'
    );
    return confirmExit;
  }
}
