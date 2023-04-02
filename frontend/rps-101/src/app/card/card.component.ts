import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @ViewChild('card', { static: false }) cardElement: ElementRef = new ElementRef(null);

  @Input() name: string = "";

  ngOnInit() {
    this.name = this.name.toLowerCase();
    setTimeout(() => {
      const currentWidth = this.cardElement.nativeElement.clientWidth;
      const newFontSize = currentWidth * 0.1;
      this.cardElement.nativeElement.style.fontSize = `${newFontSize}px`;
    }, 100);
  }
}
