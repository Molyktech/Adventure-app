export interface IChoice {
  label: string;
  nextQuestionId: string;
}

export interface IQuestion {
  id: string;
  text: string;
  image?: string;
  choices: IChoice[];
}

export interface IMappedChoice {
  id: string;
  text: string;
  label: string;
  questionId: string;
  nextQuestionId: string;
  choices: IChoice[];
}
