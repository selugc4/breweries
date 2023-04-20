import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CardApiService } from '../services/card-api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  autocompleteControl = new FormControl('');
  cards!: string[];
  filteredCards!: string[];
  isLoading: boolean = false;

  constructor(private cardApi: CardApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.cardApi.getCards().subscribe((response) => {
      this.cards = response;
      this.isLoading = false;
    });
  }

  cutString(value: string): string {
    if (value.length > 12) {
      return value.slice(0, 12) + '...';
    }
    return value;
  }

  getFiltered(filtered: string[]) {
    this.filteredCards = filtered;
  }
}
