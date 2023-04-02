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
      const currentHeight = this.deckElement.nativeElement.clientHeight;
      const newFontSize = currentWidth * 0.1;
      const newHeight = currentHeight * 0.15;
      const cardName = this.deckElement.nativeElement.childNodes[2];
      const aside = this.deckElement.nativeElement.childNodes[3];
      const secondary_objects_container = aside.firstChild;
      for (const secondary_object of secondary_objects_container.children) {
        secondary_object.firstChild.firstChild.style.height = `${newHeight}px`;
      }
      cardName.style.fontSize = `${newFontSize}px`;
    }, 100);
  }
}
