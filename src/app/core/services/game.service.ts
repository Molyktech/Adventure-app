import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Question from '../../mocks/questions.json';
import { IGameServerResponse } from '../../utils/models/questions';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  loadQuestions(): Observable<IGameServerResponse> {
    return of(Question);
  }
}
