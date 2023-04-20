import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/Deck';
import { MockObjectsService } from '../services/mock-objects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
})
export class DeckDetailComponent implements OnInit {
  deck!: Deck;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private mock: MockObjectsService
  ) {}
  ngOnInit(): void {
    this.deck = this.mock
      .getMockDecks()
      .find(
        (x) =>
          x.id == parseInt(String(this.route.snapshot.paramMap.get('deckId')))
      )!;
  }

  onDeleteDialogClick() {
    this.dialog.open(DeleteDialogComponent, {
      autoFocus: false,
    });
  }

  onEditClick() {
    this.router.navigate([`/decks/${this.deck.id}/edit`]);
  }
}
