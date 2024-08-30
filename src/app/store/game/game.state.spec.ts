import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';
import { GameActions } from './game.actions';

describe('Game store', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([GameState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: GameStateModel = {
      answeredQuestions: ['item-1'],
    };
    store.dispatch(new GameActions('item-1'));
    const actual = store.selectSnapshot(GameState.getState);
    expect(actual).toEqual(expected);
  });

  it('should update the answered questions', () => {
    const initialState: GameStateModel = {
      answeredQuestions: ['item-1'],
    };
    store.reset({ game: initialState });

    const expected: GameStateModel = {
      answeredQuestions: ['item-1', 'item-2'],
    };
    store.dispatch(new GameActions('item-2'));
    const actual = store.selectSnapshot(GameState.getState);
    expect(actual).toEqual(expected);
  });

  it('should reset the answered questions', () => {
    const initialState: GameStateModel = {
      answeredQuestions: ['item-1', 'item-2'],
    };
    store.reset({ game: initialState });

    const expected: GameStateModel = {
      answeredQuestions: [],
    };
    store.dispatch(new GameActions.ResetAnsweredQuestion());
    const actual = store.selectSnapshot(GameState.getState);
    expect(actual).toEqual(expected);
  });
});
