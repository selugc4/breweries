import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Deck } from '../models/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {

  @Input() deck!: Deck;
  @Input() displayName: boolean = true;

  ngOnInit() {

  }
}
