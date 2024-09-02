export interface IGameServerResponse {
  /**
   * @param startId — The id to show which question starts the game.
   */
  startId: string;
  /**
   *  * @param questions —  The list of questions to show in the game.
   */
  questions: IQuestion[];
}
export interface IChoice {
  /**
   * @param label - An option/answer to a particular question.
   */
  label: string;
  /**
   * @param nextQuestionId - The id for a succeeding question .
   */
  nextQuestionId: string;
}

export interface IQuestion {
  id: string;
  text: string;
  image?: string;
  /**
   * @param choices - Options/answers to a question.
   */
  choices: IChoice[];
}

export interface IMappedChoice {
  /**
   * @param id -  Current Question ID.
   */
  id: string;
  /**
   * @param text - The question being asked.
   */
  text: string;
  label: string;
  /**
   * @param questionId - an addition of Current Question ID - next question ID.
   */
  questionId: string;
  /**
   * @param nextQuestionId - Next Question ID.
   */
  nextQuestionId: string;
  choices: IChoice[];
}

export interface IMappedQuestion {
  id: string;
  text: string;
  choices: IMappedChoice[];
}
