import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import {
  GetGameQuestions,
  ResetAnsweredQuestion,
  UpdateAnsweredQuestion,
} from './game.actions';
import { IQuestion } from '../../utils/models/questions';
import { GameService } from '../../core/services/game.service';
import { firstValueFrom } from 'rxjs';

export interface GameStateModel {
  questions: IQuestion[];
  answeredQuestions: string[];
  startQuestionId: string;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    questions: [],
    answeredQuestions: [],
    startQuestionId: '',
  },
})
@Injectable()
export class GameState {
  private readonly _gameService = inject(GameService);

  @Selector()
  static getState(state: GameStateModel) {
    return state;
  }

  @Action(GetGameQuestions)
  async getGameQuestions(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    const gameQuestions = await firstValueFrom(
      this._gameService.loadQuestions(),
    );
    ctx.setState({
      ...state,
      questions: gameQuestions.questions,
      startQuestionId: gameQuestions.startId,
    });
  }

  @Action(UpdateAnsweredQuestion)
  async updateAnsweredQuestion(
    ctx: StateContext<GameStateModel>,
    { questionId }: UpdateAnsweredQuestion,
  ) {
    const state = ctx.getState();
    const answeredQuestions = [...state.answeredQuestions, questionId];
    ctx.patchState({
      answeredQuestions,
    });
  }

  @Action(ResetAnsweredQuestion)
  async resetAnsweredQuestion(ctx: StateContext<GameStateModel>) {
    ctx.patchState({
      answeredQuestions: [],
    });
  }
}
