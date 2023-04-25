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
        const deckId = parseInt(
            String(this.route.snapshot.paramMap.get('deckId'))
        );

        this.deckApi.getDeck(deckId).subscribe((result) => {
            this.deck = result;
            this.statsAnimation();
        });
    }

    statsAnimation() {
        const totalWins = this.deck.wins;
        this.deck.wins = 0;
        const winInterval = setInterval(() => {
            if (this.deck.wins === totalWins) clearInterval(winInterval);
            this.deck.wins += 1;
        }, 20);

        const totalDraws = this.deck.draws;
        this.deck.draws = 0;
        const drawInterval = setInterval(() => {
            if (this.deck.draws === totalDraws) clearInterval(drawInterval);
            this.deck.draws += 1;
        }, 20);

        const totalLoses = this.deck.loses;
        this.deck.loses = 0;
        const loseInterval = setInterval(() => {
            if (this.deck.loses === totalLoses) clearInterval(loseInterval);
            this.deck.loses += 1;
        }, 20);
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
