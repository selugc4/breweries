import { wiki } from 'app/models/wiki';
import { Observable } from 'rxjs';

export abstract class ScrapperService {
    public abstract getStateData(state: String): Observable<wiki>;
}
