import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '../models/Deck';
import { DeckApiService } from '../services/deck-api.service';
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
    private dialog: MatDialog,
    private deckApi: DeckApiService
  ) {}
  ngOnInit(): void {
    const deckId = parseInt(String(this.route.snapshot.paramMap.get('deckId')));

    this.deckApi.getDeck(deckId).subscribe((result) => {
      this.deck = result;
    });
  }

  onDeleteDialogClick() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deckApi.deleteDeck(this.deck.id).subscribe((response) => {
          //TODO: Validar response
        });
        this.router.navigate([`/decks`]);
      }
    });
  }

  onEditClick() {
    this.router.navigate([`/decks/${this.deck.id}/edit`]);
  }
}
