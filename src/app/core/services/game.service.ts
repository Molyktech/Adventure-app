import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Question from '../../mocks/questions.json';
import { IGameServerResponse } from '../../utils/models/questions';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  /**
   * Loads the questions for the game.
   * @returns An observable that emits an IGameServerResponse object.
   */
  loadQuestions(): Observable<IGameServerResponse> {
    return of(Question);
  }
}
