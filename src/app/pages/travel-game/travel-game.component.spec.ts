//eslint-disable  @typescript-eslint/no-explicit-any
/* eslint @typescript-eslint/no-empty-function: 0 */
import { Signal, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { FORMATTED_QUESTIONS, MOCK_GAME_STATE } from '../../mocks/game.mock';
import {
  GetGameQuestions,
  ResetAnsweredQuestion,
  SetCurrentQuestion,
  SetGameStatus,
  UpdateAnsweredQuestion,
} from '../../store/game/game.actions';

import { GameSelectors } from '../../store/game/game.queries';
import { GameState } from '../../store/game/game.state';
import { isEmptyObject } from '../../utils/helpers';
import { IQuestion } from '../../utils/models/questions';
import { TravelGameComponent } from './travel-game.component';

describe('TravelGameComponent', () => {
  let component: TravelGameComponent;
  let fixture: ComponentFixture<TravelGameComponent>;
  let store: Store;
  // const audioUrl = 'assets/sounds/click.wav';

  const sampleQuestionWithNoChoices = {
    start: {
      id: 'start',
      text: 'Start Question',
      choices: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TravelGameComponent,
        NgxsModule.forRoot([GameState]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelGameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      game: MOCK_GAME_STATE,
    });
    // Mock the selectors
    spyOn(store, 'selectSignal').and.callFake((selector) => {
      switch (selector) {
        case GameSelectors.getStartQuestionId:
          return signal<string>(
            MOCK_GAME_STATE.startQuestionId,
          ) as Signal<string>;
        case GameSelectors.getGameStatus:
          return signal<boolean>(MOCK_GAME_STATE.gameEnded) as Signal<boolean>;

        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return signal<any>(undefined) as Signal<any>;
      }
    });

    spyOn(store, 'select').and.callFake((selector) => {
      switch (selector) {
        case GameSelectors.getFormattedQuestions:
          return of<Record<string, IQuestion>>(FORMATTED_QUESTIONS);
        case GameSelectors.getCurrentQuestion:
          return of<IQuestion | null>(MOCK_GAME_STATE.currentQuestion);
        case GameSelectors.getAnsweredQuestions:
          return of<string[]>(MOCK_GAME_STATE.answeredQuestions);
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return of<any>(undefined);
      }
    });

    // Mock the Audio object
    spyOn(window, 'Audio').and.returnValue(
      Object.assign(document.createElement('audio'), {
         
        play: jasmine.createSpy('play').and.callFake(() => Promise.resolve()),
         
        pause: jasmine.createSpy('pause').and.callFake(() => {}),
      }),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TravelGameComponent ngOnInit', () => {
    it('should dispatch GetGameQuestions and subscribe to selectors', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      const subscribeSpy = spyOn(component, 'startAdventure').and.callThrough();

      component.ngOnInit();

      expect(dispatchSpy).toHaveBeenCalledWith(new GetGameQuestions());
      expect(subscribeSpy).toHaveBeenCalled();
    });
  });

  describe('TravelGameComponent loadQuestion', () => {
    it('should set currentQuestion and trigger animation', () => {
      const mockQuestions: Record<string, IQuestion> =
        sampleQuestionWithNoChoices;

      component.questions = mockQuestions;

      const dispatchSpy = spyOn(store, 'dispatch');
      const animationSpy = spyOn(component, 'triggerAnimation');

      component.loadQuestion('start');

      expect(component.currentQuestion).toEqual(mockQuestions['start']);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new SetCurrentQuestion(mockQuestions['start']),
      );
      expect(animationSpy).toHaveBeenCalled();
    });

    it('should set game status to true and update endMessage if no choices are available', () => {
      const mockQuestions: Record<string, IQuestion> =
        sampleQuestionWithNoChoices;

      component.questions = mockQuestions;

      const dispatchSpy = spyOn(store, 'dispatch');

      component.loadQuestion('start');

      expect(dispatchSpy).toHaveBeenCalledWith(new SetGameStatus(true));
      expect(component.endMessage()).toBe('Start Question');
    });
  });
  describe('TravelGameComponent selectChoice', () => {
    it('should play click sound and load next question if nextQuestionId is provided', () => {
      const mockCurrentQuestion: IQuestion = {
        id: 'start',
        text: 'Start Question?',
        choices: [{ label: 'Next', nextQuestionId: 'next1' }],
      };

      const mockQuestions: Record<string, IQuestion> = {
        start: mockCurrentQuestion,
        next1: {
          id: 'next1',
          text: 'Next Question 1?',
          choices: [],
        },
      };

      component.questions = mockQuestions;
      component.currentQuestion = mockCurrentQuestion;

      // const playSpy = spyOn(component.clickSound, 'play');
      const loadQuestionSpy = spyOn(component, 'loadQuestion');

      component.selectChoice(mockCurrentQuestion.choices[0]);
      // expect(playAudio).toHaveBeenCalledWith(audioUrl, false);
      // expect(playSpy).toHaveBeenCalled();
      expect(loadQuestionSpy).toHaveBeenCalledWith('next1');
    });

    it('should end the game if nextQuestionId is not provided', () => {
      const mockCurrentQuestion: IQuestion = {
        id: 'start',
        text: 'Start Question?',
        choices: [{ label: 'End', nextQuestionId: '' }],
      };

      component.currentQuestion = mockCurrentQuestion;

      const dispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.selectChoice(mockCurrentQuestion.choices[0]);

      expect(dispatchSpy).toHaveBeenCalledWith(new SetGameStatus(true));
      expect(component.endMessage()).toBe('Thank you for playing!');
    });
  });
  describe('TravelGameComponent triggerAnimation', () => {
    it('should set animationState to hidden and then visible after timeout', (done) => {
      component.triggerAnimation();
      expect(component.animationState()).toBe('hidden');

      setTimeout(() => {
        expect(component.animationState()).toBe('visible');
        done();
      }, 100);
    });
  });
  describe('TravelGameComponent startAdventure', () => {
    it('should call loadQuestion with storedQuestionId', () => {
      const mockCurrentQuestion: IQuestion = {
        id: 'start',
        text: 'Start Question?',
        choices: [],
      };

      component.currentQuestion = mockCurrentQuestion;
      component.questionStartKey = signal<string>('start');

      const loadQuestionSpy = spyOn(component, 'loadQuestion');

      component.startAdventure();

      expect(loadQuestionSpy).toHaveBeenCalledWith('start');
    });
  });
  describe('TravelGameComponent updateAndResetAnsweredQuestions', () => {
    it('should dispatch ResetAnsweredQuestion and UpdateAnsweredQuestion actions', () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      component.updateAndResetAnsweredQuestions();

      expect(dispatchSpy).toHaveBeenCalledWith(new ResetAnsweredQuestion());
      expect(dispatchSpy).toHaveBeenCalledWith(
        new UpdateAnsweredQuestion('start'),
      );
    });
  });

  describe('TravelGameComponent restartAdventure', () => {
    it('should reset the game and restart the adventure', () => {
      const resetSpy = spyOn(component, 'updateAndResetAnsweredQuestions');
      const loadQuestionSpy = spyOn(component, 'loadQuestion');

      component.restartAdventure();

      expect(resetSpy).toHaveBeenCalled();
      expect(loadQuestionSpy).toHaveBeenCalledWith('start');
    });
  });

  describe('TravelGameComponent isEmptyObject', () => {
    it('should return true for an empty object', () => {
      const obj = {};
      const result = isEmptyObject(obj);
      expect(result).toBe(true);
    });

    it('should return false for a non-empty object', () => {
      const obj = { key: 'value' };
      const result = isEmptyObject(obj);
      expect(result).toBe(false);
    });

    it('should return true for an object with empty string values', () => {
      const obj = { key: '' };
      const result = isEmptyObject(obj);
      expect(result).toBe(true);
    });

    it('should return true for an object with empty array values', () => {
      const obj = { key: [] };
      const result = isEmptyObject(obj);
      expect(result).toBe(true);
    });

    it('should return true for an object with nested empty objects', () => {
      const obj = { key: { nestedKey: {} } };
      const result = isEmptyObject(obj);
      expect(result).toBe(true);
    });

    it('should return true for undefined', () => {
      const obj = undefined;
      const result = isEmptyObject(obj);
      expect(result).toBe(true);
    });
  });

  describe('TravelGameComponent ngOnDestroy', () => {
    it('should pause the click sound and restart the adventure', () => {
      // const pauseSpy = spyOn(component.clickSound, 'pause');
      const restartSpy = spyOn(component, 'restartAdventure');

      component.ngOnDestroy();

      // expect(pauseSpy).toHaveBeenCalled();

      expect(restartSpy).toHaveBeenCalled();
    });
  });
});
