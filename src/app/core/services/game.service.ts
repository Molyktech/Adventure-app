import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IQuestion } from '../../utils/models/questions';
import Question from '../../mocks/questions.json';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  loadQuestions(): Observable<IQuestion[]> {
    return of(Question);
  }
}
//Aisha-2024
