import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load questions', () => {
    service.loadQuestions().subscribe((questionsArr) => {
      expect(questionsArr).toBeTruthy();
      expect(questionsArr.questions.length).toBeGreaterThan(0);
    });
  });
});
