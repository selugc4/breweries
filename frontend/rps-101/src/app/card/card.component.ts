import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() name: string = "";

  ngOnChanges(){
    this.name = this.name.toLowerCase();
  }
}
