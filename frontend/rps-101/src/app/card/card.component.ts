import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() name: string = '';
  @Input() flipCard: boolean = false;

  ngOnChanges() {
    this.name = this.name.toLowerCase();
  }
}
