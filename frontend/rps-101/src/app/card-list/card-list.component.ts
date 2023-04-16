import { Component, OnInit } from '@angular/core';
import { MockObjectsService } from '../services/mock-objects.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardApiService } from '../services/card-api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  autocompleteControl = new FormControl('');
  cards!: string[];
  filteredCards!: string[];
  regularDistribution = 100 / 3 + '%';

  constructor(
    private mockObjectsService: MockObjectsService,
    private route: ActivatedRoute,
    private location: Location,
    private cardApi: CardApiService
  ) {}

  ngOnInit(): void {
    this.cards = this.mockObjectsService.getMockObjects();
    //TODO: Autocomplete component does not work properly when the input comes from asyncronous calls
    // this.cardApi.getCards().subscribe((response) => {
    //   this.cards = response;
    // });
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
