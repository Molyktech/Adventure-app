import { GameStateModel } from '../store/game/game.state';
import Question from './questions.json';
export const QUESTIONS_MOCK = Question;
export const MAPPED_QUESTIONS_MOCK = {
  id: 'start',
  text: "You're planning a getaway! Do you prefer a relaxing beach escape or an adventurous mountain retreat?",
  choices: [
    {
      id: 'beach',
      text: 'At the beach, would you rather unwind in a quiet, secluded spot or enjoy a lively beach town with lots of activities?',
      label: 'Relaxing Beach Escape',
      questionId: 'start-beach',
      nextQuestionId: 'beach',
      choices: [
        {
          id: 'island',
          text: 'You find a beautiful, hidden island. Do you spend your days exploring the underwater coral reefs or lounging on the pristine white-sand beaches?',
          label: 'Secluded Spot',
          questionId: 'beach-island',
          nextQuestionId: 'island',
          choices: [
            {
              id: 'reef',
              text: 'Diving among the coral reefs, you discover vibrant marine life. You feel at peace and find yourself in harmony with nature. Your ideal destination is the Maldives, a paradise for underwater adventures!',
              label: 'Exploring Coral Reefs',
              questionId: 'island-reef',
              nextQuestionId: 'reef',
              choices: [],
            },
            {
              id: 'beach_lounge',
              text: 'Lounging on the beach with a cool drink in hand, you watch the sunset over the horizon. Your perfect escape is Bora Bora, where relaxation is a way of life.',
              label: 'Lounging on the Beach',
              questionId: 'island-beach_lounge',
              nextQuestionId: 'beach_lounge',
              choices: [],
            },
          ],
        },
        {
          id: 'town',
          text: 'In the lively beach town, do you prefer to explore local markets and try exotic foods, or dance the night away at beachside parties?',
          label: 'Lively Beach Town',
          questionId: 'beach-town',
          nextQuestionId: 'town',
          choices: [
            {
              id: 'market',
              text: 'After a day of exploring markets and tasting exotic foods, you fall in love with the local culture. Your dream destination is Bali, where vibrant culture meets tropical beauty.',
              label: 'Explore Markets and Foods',
              questionId: 'town-market',
              nextQuestionId: 'market',
              choices: [],
            },
            {
              id: 'party',
              text: 'Dancing under the stars at a beachside party, you realize this is where you belong. Your ultimate destination is Ibiza, the party capital of the world.',
              label: 'Beachside Parties',
              questionId: 'town-party',
              nextQuestionId: 'party',
              choices: [],
            },
          ],
        },
      ],
    },
    {
      id: 'mountain',
      text: 'In the mountains, are you more excited about hiking through lush forests or skiing down snowy slopes?',
      label: 'Adventurous Mountain Retreat',
      questionId: 'start-mountain',
      nextQuestionId: 'mountain',
      choices: [
        {
          id: 'forest',
          text: 'While hiking, you come across a hidden waterfall. Do you take a refreshing swim or continue your hike to reach a scenic mountain vista?',
          label: 'Hiking Through Forests',
          questionId: 'mountain-forest',
          nextQuestionId: 'forest',
          choices: [
            {
              id: 'swim',
              text: 'After a refreshing swim in the waterfall, you feel rejuvenated. Your adventurous spirit is leading you to Costa Rica, where nature is at its most beautiful.',
              label: 'Take a Swim',
              questionId: 'forest-swim',
              nextQuestionId: 'swim',
              choices: [],
            },
            {
              id: 'vista',
              text: 'Reaching the scenic mountain vista, you take in the breathtaking views. Your ideal getaway is in the Swiss Alps, where the mountains touch the sky.',
              label: 'Continue Hiking',
              questionId: 'forest-vista',
              nextQuestionId: 'vista',
              choices: [],
            },
          ],
        },
        {
          id: 'ski',
          text: 'On the snowy slopes, would you rather spend the day skiing down challenging trails or cozy up in a mountain cabin with hot cocoa?',
          label: 'Skiing Down Slopes',
          questionId: 'mountain-ski',
          nextQuestionId: 'ski',
          choices: [
            {
              id: 'challenging',
              text: 'After a thrilling day on the challenging ski trails, you feel accomplished. Your dream destination is Aspen, the perfect place for serious skiers.',
              label: 'Skiing Challenging Trails',
              questionId: 'ski-challenging',
              nextQuestionId: 'challenging',
              choices: [],
            },
            {
              id: 'cabin',
              text: 'Cozying up in a mountain cabin, you feel the warmth of the fire and the comfort of solitude. Your perfect escape is in the Canadian Rockies, where you can find peace in nature.',
              label: 'Cozy Up in a Cabin',
              questionId: 'ski-cabin',
              nextQuestionId: 'cabin',
              choices: [],
            },
          ],
        },
      ],
    },
  ],
};
export const FORMATTED_QUESTIONS = {
  start: {
    id: 'start',
    text: "You're planning a getaway! Do you prefer a relaxing beach escape or an adventurous mountain retreat?",
    choices: [
      {
        label: 'Relaxing Beach Escape',
        nextQuestionId: 'beach',
      },
      {
        label: 'Adventurous Mountain Retreat',
        nextQuestionId: 'mountain',
      },
    ],
  },
  beach: {
    id: 'beach',
    text: 'At the beach, would you rather unwind in a quiet, secluded spot or enjoy a lively beach town with lots of activities?',
    choices: [
      {
        label: 'Secluded Spot',
        nextQuestionId: 'island',
      },
      {
        label: 'Lively Beach Town',
        nextQuestionId: 'town',
      },
    ],
  },
  mountain: {
    id: 'mountain',
    text: 'In the mountains, are you more excited about hiking through lush forests or skiing down snowy slopes?',
    choices: [
      {
        label: 'Hiking Through Forests',
        nextQuestionId: 'forest',
      },
      {
        label: 'Skiing Down Slopes',
        nextQuestionId: 'ski',
      },
    ],
  },
  island: {
    id: 'island',
    text: 'You find a beautiful, hidden island. Do you spend your days exploring the underwater coral reefs or lounging on the pristine white-sand beaches?',
    choices: [
      {
        label: 'Exploring Coral Reefs',
        nextQuestionId: 'reef',
      },
      {
        label: 'Lounging on the Beach',
        nextQuestionId: 'beach_lounge',
      },
    ],
  },
  town: {
    id: 'town',
    text: 'In the lively beach town, do you prefer to explore local markets and try exotic foods, or dance the night away at beachside parties?',
    choices: [
      {
        label: 'Explore Markets and Foods',
        nextQuestionId: 'market',
      },
      {
        label: 'Beachside Parties',
        nextQuestionId: 'party',
      },
    ],
  },
  forest: {
    id: 'forest',
    text: 'While hiking, you come across a hidden waterfall. Do you take a refreshing swim or continue your hike to reach a scenic mountain vista?',
    choices: [
      {
        label: 'Take a Swim',
        nextQuestionId: 'swim',
      },
      {
        label: 'Continue Hiking',
        nextQuestionId: 'vista',
      },
    ],
  },
  ski: {
    id: 'ski',
    text: 'On the snowy slopes, would you rather spend the day skiing down challenging trails or cozy up in a mountain cabin with hot cocoa?',
    choices: [
      {
        label: 'Skiing Challenging Trails',
        nextQuestionId: 'challenging',
      },
      {
        label: 'Cozy Up in a Cabin',
        nextQuestionId: 'cabin',
      },
    ],
  },
  reef: {
    id: 'reef',
    text: 'Diving among the coral reefs, you discover vibrant marine life. You feel at peace and find yourself in harmony with nature. Your ideal destination is the Maldives, a paradise for underwater adventures!',
    choices: [],
  },
  beach_lounge: {
    id: 'beach_lounge',
    text: 'Lounging on the beach with a cool drink in hand, you watch the sunset over the horizon. Your perfect escape is Bora Bora, where relaxation is a way of life.',
    choices: [],
  },
  market: {
    id: 'market',
    text: 'After a day of exploring markets and tasting exotic foods, you fall in love with the local culture. Your dream destination is Bali, where vibrant culture meets tropical beauty.',
    choices: [],
  },
  party: {
    id: 'party',
    text: 'Dancing under the stars at a beachside party, you realize this is where you belong. Your ultimate destination is Ibiza, the party capital of the world.',
    choices: [],
  },
  swim: {
    id: 'swim',
    text: 'After a refreshing swim in the waterfall, you feel rejuvenated. Your adventurous spirit is leading you to Costa Rica, where nature is at its most beautiful.',
    choices: [],
  },
  vista: {
    id: 'vista',
    text: 'Reaching the scenic mountain vista, you take in the breathtaking views. Your ideal getaway is in the Swiss Alps, where the mountains touch the sky.',
    choices: [],
  },
  challenging: {
    id: 'challenging',
    text: 'After a thrilling day on the challenging ski trails, you feel accomplished. Your dream destination is Aspen, the perfect place for serious skiers.',
    choices: [],
  },
  cabin: {
    id: 'cabin',
    text: 'Cozying up in a mountain cabin, you feel the warmth of the fire and the comfort of solitude. Your perfect escape is in the Canadian Rockies, where you can find peace in nature.',
    choices: [],
  },
};

export const MOCK_GAME_STATE: GameStateModel = {
  currentQuestion: QUESTIONS_MOCK.questions[0],
  questions: QUESTIONS_MOCK.questions,
  answeredQuestions: ['start'],
  gameEnded: false,
  startQuestionId: QUESTIONS_MOCK.startId,
};
export const TEST_MOCK_QUESTIONS = {
  start: {
    id: 'start',
    text: 'Start Question?',
    choices: [
      { label: 'Choice 1', nextQuestionId: 'next1' },
      { label: 'Choice 2', nextQuestionId: 'next2' },
    ],
  },
  next1: {
    id: 'next1',
    text: 'Next Question 1?',
    choices: [],
  },
  next2: {
    id: 'next2',
    text: 'Next Question 2?',
    choices: [],
  },
};

export const TEST_MAPPED_MOCKED_QUESTIONS = {
  id: 'start',
  text: 'Start Question?',
  choices: [
    {
      id: 'next1',
      text: 'Next Question 1?',
      label: 'Choice 1',
      questionId: 'start-next1',
      nextQuestionId: 'next1',
      choices: [],
    },
    {
      id: 'next2',
      text: 'Next Question 2?',
      label: 'Choice 2',
      questionId: 'start-next2',
      nextQuestionId: 'next2',
      choices: [],
    },
  ],
};
