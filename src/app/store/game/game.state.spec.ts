import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { MOCK_GAME_STATE } from '../../mocks/game.mock';
import { GetGameQuestions } from './game.actions';
import { GameState } from './game.state';

describe('Game store', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([GameState])],
    });

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      game: MOCK_GAME_STATE,
    });
  });

  it('should get all questions', () => {
    store.dispatch(new GetGameQuestions());
    const state = store.selectSnapshot(GameState.getState);
    expect(state.questions).toEqual(
      jasmine.objectContaining(MOCK_GAME_STATE.questions),
    );
  });

  // it('should update the answered questions', () => {
  //   const initialState: GameStateModel = {
  //     answeredQuestions: ['item-1'],
  //   };
  //   store.reset({ game: initialState });

  //   const expected: GameStateModel = {
  //     answeredQuestions: ['item-1', 'item-2'],
  //   };
  //   store.dispatch(new GameActions('item-2'));
  //   const actual = store.selectSnapshot(GameState.getState);
  //   expect(actual).toEqual(expected);
  // });

  // it('should reset the answered questions', () => {
  //   const initialState: GameStateModel = {
  //     answeredQuestions: ['item-1', 'item-2'],
  //   };
  //   store.reset({ game: initialState });

  //   const expected: GameStateModel = {
  //     answeredQuestions: [],
  //   };
  //   store.dispatch(new GameActions.ResetAnsweredQuestion());
  //   const actual = store.selectSnapshot(GameState.getState);
  //   expect(actual).toEqual(expected);
  // });
});
