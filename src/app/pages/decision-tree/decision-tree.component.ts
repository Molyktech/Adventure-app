import { Component, Input, OnInit } from '@angular/core';
import {
  IChoice,
  IMappedChoice,
  IMappedQuestion,
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
  @Input({ required: true }) questions: Record<string, IQuestion> = {};
  @Input({ required: true }) path: string[] | null = [];
  nodes!: IMappedQuestion;
  @Input({ required: true }) questionStartKey = '';

  ngOnInit(): void {
    this.nodes = this.buildQuestionTree(this.questions);
  }

  /**
   * Builds a decision tree based on the provided questions.
   *
   * @param questions - A record of questions, where the key is the question key and the value is the question object.
   * @returns An Object that contains the questions and all potential choices as well as the choices the user made.
   */
  buildQuestionTree(questions: Record<string, IQuestion>): IMappedQuestion {
    const startQuestion = questions[this.questionStartKey];

    const result: IMappedQuestion = {
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
    choices: IChoice[] | IMappedChoice[],
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
  /**
   * Helper method to check if a node is part of the selected path.
   * @param nodeId - The ID of the node to check.
   * @returns A boolean indicating if the node is selected.
   */

  isSelected(nodeId: string): boolean {
    return (this.path?.length && this.path.includes(nodeId)) || false;
  }
}
