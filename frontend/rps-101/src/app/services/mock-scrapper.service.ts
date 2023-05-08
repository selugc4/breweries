import { Injectable } from '@angular/core';
import { ScrapperService } from './scrapper.service';
import { Opponent } from 'app/models/Opponent';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockScrapperService implements ScrapperService {
    public getOpponentData(): Observable<Opponent> {
        return of({
            name: 'ANONYMOUS',
            image: 'assets/user.svg',
        });
    }
}
