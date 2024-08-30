import { Component, Input, OnInit } from '@angular/core';
import {
  IChoice,
  IMappedChoice,
  IQuestion,
} from '../../utils/models/questions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decision-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decision-tree.component.html',
  styleUrl: './decision-tree.component.scss',
})
export class DecisionTreeComponent implements OnInit {
  @Input() questions: Record<string, IQuestion> = {};
  @Input() path: string[] = [];
  nodes!: IQuestion;
  questionStartKey = 'start';

  ngOnInit(): void {
    this.nodes = this.buildQuestionTree(this.questions);
    console.log('path', this.path, this.nodes);
  }

  buildQuestionTree(questions: Record<string, IQuestion>): IQuestion {
    const startQuestion = questions[this.questionStartKey];
    const result: IQuestion = {
      id: startQuestion.id,
      text: startQuestion.text,
      choices: this.buildChoicesTree(
        questions,
        startQuestion.choices,
        startQuestion.id,
      ),
    };

    return result;
  }

  buildChoicesTree(
    questions: Record<string, IQuestion>,
    choices: IChoice[],
    selectedQuestionId: string,
  ): IMappedChoice[] {
    return choices
      .map((choice) => {
        const selectedQuestion = questions[choice.nextQuestionId];
        if (selectedQuestion === undefined) {
          return undefined;
        }
        return {
          id: selectedQuestion.id,
          text: selectedQuestion.text,
          label: choice.label,
          questionId: `${selectedQuestionId}-${choice.nextQuestionId}`,
          nextQuestionId: choice.nextQuestionId,
          choices: this.buildChoicesTree(
            questions,
            selectedQuestion.choices,
            selectedQuestion.id,
          ),
        };
      })
      .filter((choice) => choice !== undefined);
  }
}
