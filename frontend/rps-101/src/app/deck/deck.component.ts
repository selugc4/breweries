import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Deck } from '../models/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {
  @ViewChild('deckElement') deckElement: ElementRef =
    new ElementRef(null);

  @Input() deck!: Deck;

  ngOnInit() {
    setTimeout(() => {
      const currentWidth = this.deckElement.nativeElement.clientWidth;
      const newPrimaryFontSize = currentWidth * 0.1;
      const newSecondaryFontSize = currentWidth * 0.035;
      const primaryName = this.deckElement.nativeElement.childNodes[2];
      const aside = this.deckElement.nativeElement.childNodes[3];
      aside.style.fontSize = `${newSecondaryFontSize}px`;
      primaryName.style.fontSize = `${newPrimaryFontSize}px`;
    }, 100);
  }
}
