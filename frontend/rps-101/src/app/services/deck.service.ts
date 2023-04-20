import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Deck } from 'app/models/Deck';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private api: ApiService) {}
  private decksUrl = 'http://localhost:8081/api/decks';

  getDecks(): Observable<Deck[]> {
    return this.api.get<any>(`${this.decksUrl}`).pipe(
      map((response) => {
        return response._embedded.decks;
      })
    );
  }

  getDeck(id: number): Observable<Deck> {
    return this.api.get<any>(`${this.decksUrl}/${id}`);
  }

  updateDeck(id:number, deck: Deck): Observable<any> {
    return this.api.put(this.decksUrl+`/${id}`, deck);
  }

  addDeck(deck: Deck): Observable<Deck> {
    return this.api.post<any>(this.decksUrl, deck);
  }

  deleteDeck(id: number): Observable<Deck> {
    return this.api.delete<any>(this.decksUrl+`/${id}`);
  }

}
