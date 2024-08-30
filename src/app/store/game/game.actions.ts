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
