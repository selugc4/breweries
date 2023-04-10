import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { BattleOutcome } from '../models/BattleOutcome';
import { CardOutcomes, WinningOutcome } from '../models/CardOutcomes';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {

  private rps101Url = 'https://rps101.pythonanywhere.com/api/v1';

  constructor(private api: ApiService) { }

  getCards(): Observable<string[]> {
    return this.api.get<string[]>(`${this.rps101Url}/objects/all`);
  }

  getCardOutcomes(cardName: string): Observable<CardOutcomes> {
    return this.api.get<any>(`${this.rps101Url}/objects/${cardName}`).pipe(
      map(response => {
        const cardOutcomes: CardOutcomes = {
          card: response.object,
          winningOutcomes: response['winning outcomes'].map((outcome: WinningOutcome[]) => ({
            outcome: outcome[0],
            losingCard: outcome[1]
          }))
        };
        return cardOutcomes;
      })
    );
  }

  getMatchResult(card1: string, card2: string): Observable<BattleOutcome> {
    return this.api.get<BattleOutcome>(`${this.rps101Url}/match?object_one=${card1}&object_two=${card2}`);
  }
}
