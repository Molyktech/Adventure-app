import { createPropertySelectors, createSelector } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';
import { IQuestion } from '../../utils/models/questions';

export class GameSelectors {
  static getSlices = createPropertySelectors<GameStateModel>(GameState);

  static getQuestions = createSelector(
    [GameSelectors.getSlices.questions],
    (state) => state,
  );

  static getStartQuestionId = createSelector(
    [GameSelectors.getSlices.startQuestionId],
    (state) => state,
  );

  static getFormattedQuestions = createSelector(
    [GameSelectors.getSlices.questions],
    (questions) =>
      questions.reduce(
        (acc, question) => ({
          ...acc,
          [question.id]: question,
        }),
        {} as Record<string, IQuestion>,
      ),
  );

  static getAnsweredQuestions = createSelector(
    [GameSelectors.getSlices.answeredQuestions],
    (state) => state,
  );

  static getCurrentQuestion = createSelector(
    [GameSelectors.getSlices.currentQuestion],
    (currentQuestion) => currentQuestion,
  );

  static getGameStatus = createSelector(
    [GameSelectors.getSlices.gameEnded],
    (gameEnded) => gameEnded,
  );
}
