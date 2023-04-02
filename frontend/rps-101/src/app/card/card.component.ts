import { Component } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private mock: MockObjectsService) { }

  card_name = "";

  ngOnInit() {
    this.card_name = this.mock.getMockObjects()[0].toLowerCase();
  }

}
