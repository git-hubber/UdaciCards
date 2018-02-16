import {
  ADD_CARD,
  ADD_DECK,
  GET_DECK,
  GET_DECKS,
} from '../actions/types';

export default (state = {}, action) => {
  const { data, key } = action;

  switch (action.type) {
    case ADD_CARD: {
      const { question, answer, deck } = data;
      const previousState = { ...state };
      const { title } = previousState[deck];
      let { questions }  = previousState[deck];

      questions.push({
        question,
        answer,
      });

      return {
        ...state,
        [deck]: {
          title,
          questions,
        },
      };
    }

    case ADD_DECK: {
      const { title } = data;

      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    }

    case GET_DECK: {
      return {
        ...state,
        [key]: data,
      };
    }

    case GET_DECKS: {
      return {
        ...state,
        ...data,
      };
    }

    default:
      return state;
  };
};