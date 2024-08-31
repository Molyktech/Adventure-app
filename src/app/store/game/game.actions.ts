import { IQuestion } from '../../utils/models/questions';

export class GetGameQuestions {
  static readonly type = '[Game] Get questions';
}

export class UpdateAnsweredQuestion {
  static readonly type = '[Game] Update answered question';
  constructor(public questionId: string) {}
}

export class ResetAnsweredQuestion {
  static readonly type = '[Game] Reset answered question';
}

export class SetCurrentQuestion {
  static readonly type = '[Game] Set current question';
  constructor(public question: IQuestion | null) {}
}

export class SetGameStatus {
  static readonly type = '[Game] Set game status';
  constructor(public status: boolean) {}
}
