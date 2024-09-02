import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelGameComponent } from './travel-game.component';
import { Store } from '@ngxs/store';
import { MAPPED_QUESTIONS_MOCK, MOCK_GAME_STATE } from '../../mocks/game.mock';
import { of } from 'rxjs';
import { GetGameQuestions } from '../../store/game/game.actions';

describe('TravelGameComponent', () => {
  let component: TravelGameComponent;
  let fixture: ComponentFixture<TravelGameComponent>;
  let _store: Store;
  // let dispatchSpy: jasmine.Spy;
  let gameStoreSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    gameStoreSpy = jasmine.createSpyObj('Store', [
      'dispatch',
      'select',
      'pipe',
      'subscribe',
    ]);
    await TestBed.configureTestingModule({
      imports: [TravelGameComponent],
      providers: [{ provide: Store, useValue: gameStoreSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    _store = TestBed.inject(Store);
    _store.reset({
      ..._store.snapshot(),
      game: MOCK_GAME_STATE,
    });
    // dispatchSpy = spyOn(_store, 'dispatch');
    spyOn(_store, 'select').and.returnValue(of(MAPPED_QUESTIONS_MOCK).pipe());
    spyOn(_store, 'select').and.returnValue(
      of(MOCK_GAME_STATE.startQuestionId),
    );
    spyOn(_store, 'select').and.returnValue(
      of(MOCK_GAME_STATE.currentQuestion),
    );
    component.answeredQuestions$ = of(MOCK_GAME_STATE.answeredQuestions);

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    // dispatchSpy = spyOn(_store, 'dispatch');
    spyOn(_store, 'dispatch').and.callThrough();
    spyOn(_store, 'select').and.returnValue(of(MAPPED_QUESTIONS_MOCK).pipe());
    spyOn(_store, 'select').and.returnValue(
      of(MOCK_GAME_STATE.startQuestionId),
    );
    spyOn(_store, 'select').and.returnValue(
      of(MOCK_GAME_STATE.currentQuestion),
    );

    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(_store.dispatch).toHaveBeenCalledWith(new GetGameQuestions());
  });

  // it('should load a question when loadQuestion is called with a valid id', () => {
  //   const questionId = 'question1';
  //   const question = { id: questionId };
  //   spyOn(store, 'dispatch');
  //   spyOn(component, 'triggerAnimation');

  //   component.loadQuestion(questionId);

  //   expect(component.currentQuestion).toEqual(question);
  //   expect(store.dispatch).toHaveBeenCalledWith(new SetCurrentQuestion(question));
  //   expect(component.triggerAnimation).toHaveBeenCalled();
  // });

  // it('should set game status to true and display end message when loadQuestion is called with a question that has no choices', () => {
  //   const questionId = 'question2';
  //   const question = { id: questionId, text: 'End message' };
  //   spyOn(store, 'dispatch');

  //   component.loadQuestion(questionId);

  //   expect(component.currentQuestion).toEqual(question);
  //   expect(component.gameEnded).toBeTrue();
  //   expect(component.endMessage).toEqual(question.text);
  //   expect(store.dispatch).toHaveBeenCalledWith(new SetGameStatus(true));
  // });

  // it('should play click sound when selectChoice is called', () => {
  //   spyOn(component.clickSound, 'play');
  //   const choice = { nextQuestionId: 'question3' };
  //   spyOn(store, 'dispatch');

  //   component.selectChoice(choice);

  //   expect(component.clickSound.play).toHaveBeenCalled();
  //   expect(store.dispatch).toHaveBeenCalledWith(new UpdateAnsweredQuestion('question2-question3'));
  // });

  // it('should update answered questions and load next question when selectChoice is called with a choice that has a nextQuestionId', () => {
  //   const choice = { nextQuestionId: 'question3' };
  //   const nextQuestion = { id: choice.nextQuestionId };
  //   spyOn(store, 'dispatch');
  //   spyOn(component, 'loadQuestion');

  //   component.selectChoice(choice);

  //   expect(component.currentQuestion).toEqual(nextQuestion);
  //   expect(store.dispatch).toHaveBeenCalledWith(new UpdateAnsweredQuestion('question2-question3'));
  //   expect(component.loadQuestion).toHaveBeenCalledWith(choice.nextQuestionId);
  // });

  // it('should set game status to true and display end message when selectChoice is called with a choice that has no nextQuestionId', () => {
  //   const choice = { nextQuestionId: null };
  //   spyOn(store, 'dispatch');

  //   component.selectChoice(choice);

  //   expect(component.gameEnded).toBeTrue();
  //   expect(component.endMessage).toEqual('Thank you for playing!');
  //   expect(store.dispatch).toHaveBeenCalledWith(new SetGameStatus(true));
  // });

  // it('should trigger animation when triggerAnimation is called', () => {
  //   component.triggerAnimation();
  //   expect(component.animationState).toEqual('visible');
  // });

  // it('should call loadQuestion with the stored question id when startAdventure is called', () => {
  //   const storedQuestionId = 'question1';
  //   spyOn(component, 'loadQuestion');

  //   component.questionStartKey = storedQuestionId;
  //   component.startAdventure();

  //   expect(component.loadQuestion).toHaveBeenCalledWith(storedQuestionId);
  // });

  // it('should dispatch actions to update and reset answered questions when updateAndResetAnsweredQuestions is called', () => {
  //   spyOn(store, 'dispatch');

  //   component.updateAndResetAnsweredQuestions();

  //   expect(store.dispatch).toHaveBeenCalledTimes(2);
  //   expect(store.dispatch).toHaveBeenCalledWith(new ResetAnsweredQuestion());
  //   expect(store.dispatch).toHaveBeenCalledWith(new UpdateAnsweredQuestion(component.questionStartKey));
  // });

  // it('should dispatch actions to reset game status and load start question when restartAdventure is called', () => {
  //   spyOn(component, 'updateAndResetAnsweredQuestions');
  //   spyOn(store, 'dispatch');

  //   component.restartAdventure();

  //   expect(component.updateAndResetAnsweredQuestions).toHaveBeenCalled();
  //   expect(store.dispatch).toHaveBeenCalledTimes(3);
  //   expect(store.dispatch).toHaveBeenCalledWith(new SetCurrentQuestion(null));
  //   expect(store.dispatch).toHaveBeenCalledWith(new SetGameStatus(false));
  //   expect(component.loadQuestion).toHaveBeenCalledWith(component.questionStartKey);
  // });

  // it('should dispatch get game questions action', () => {
  //   expect(dispatchSpy).toHaveBeenCalled();
  //   expect(dispatchSpy).toHaveBeenCalledWith(new GetGameQuestions());
  // });
  // it('should subscribe to store.select and set questionStartKey', () => {
  //   const mockStartQuestionId = MOCK_GAME_STATE.startQuestionId;

  //   // Mock the store.select call to return an observable
  //   spyOn(store, 'select').and.returnValue(of(mockStartQuestionId));

  //   // Trigger ngOnInit
  //   component.ngOnInit();

  //   // Check if wraps were correctly set
  //   expect(component.questionStartKey).toEqual(mockStartQuestionId);
  // });

  // it('should load a question when loadQuestion is called with a valid id', () => {
  //   const questionId = 'question1';
  //   component.loadQuestion(questionId);
  //   expect(component.currentQuestion).toEqual(component.questions[questionId]);
  // });

  // it('should set game status to true and display end message when loadQuestion is called with a question that has no choices', () => {
  //   const questionId = 'question2';
  //   component.loadQuestion(questionId);
  //   expect(component.currentQuestion).toEqual(component.questions[questionId]);
  //   expect(component.gameEnded).toBeTrue();
  //   expect(component.endMessage).toEqual(component.currentQuestion.text);
  // });

  // it('should play click sound when selectChoice is called', () => {
  //   spyOn(component.clickSound, 'play');
  //   const choice = { nextQuestionId: 'question3' };
  //   component.selectChoice(choice);
  //   expect(component.clickSound.play).toHaveBeenCalled();
  // });

  // it('should update answered questions and load next question when selectChoice is called with a choice that has a nextQuestionId', () => {
  //   const choice = { nextQuestionId: 'question3' };
  //   component.selectChoice(choice);
  //   expect(component.currentQuestion).toEqual(component.questions[choice.nextQuestionId]);
  // });

  // it('should set game status to true and display end message when selectChoice is called with a choice that has no nextQuestionId', () => {
  //   const choice = { nextQuestionId: null };
  //   component.selectChoice(choice);
  //   expect(component.gameEnded).toBeTrue();
  //   expect(component.endMessage).toEqual('Thank you for playing!');
  // });

  // it('should trigger animation when triggerAnimation is called', () => {
  //   component.triggerAnimation();
  //   expect(component.animationState).toEqual('visible');
  // });

  // it('should call loadQuestion with the stored question id when startAdventure is called', () => {
  //   spyOn(component, 'loadQuestion');
  //   component.startAdventure();
  //   expect(component.loadQuestion).toHaveBeenCalledWith(component.questionStartKey);
  // });

  // it('should dispatch actions to update and reset answered questions when updateAndResetAnsweredQuestions is called', () => {
  //   spyOn(component._store, 'dispatch');
  //   component.updateAndResetAnsweredQuestions();
  //   expect(component._store.dispatch).toHaveBeenCalledTimes(2);
  //   expect(component._store.dispatch).toHaveBeenCalledWith(new ResetAnsweredQuestion());
  //   expect(component._store.dispatch).toHaveBeenCalledWith(new UpdateAnsweredQuestion(component.questionStartKey));
  // });

  // it('should dispatch actions to reset game status and load start question when restartAdventure is called', () => {
  //   spyOn(component, 'updateAndResetAnsweredQuestions');
  //   spyOn(component._store, 'dispatch');
  //   component.restartAdventure();
  //   expect(component.updateAndResetAnsweredQuestions).toHaveBeenCalled();
  //   expect(component._store.dispatch).toHaveBeenCalledTimes(3);
  //   expect(component._store.dispatch).toHaveBeenCalledWith(new SetCurrentQuestion(null));
  //   expect(component._store.dispatch).toHaveBeenCalledWith(new SetGameStatus(false));
  //   expect(component.loadQuestion).toHaveBeenCalledWith(component.questionStartKey);
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
