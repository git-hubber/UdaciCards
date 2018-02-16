import { AsyncStorage } from 'react-native';

const UDACICARDS_CARDS_KEY = 'UdaciCards:cards';

export const addCardAPI = (data) => {
  const { question, answer, deck } = data;

  return AsyncStorage.getItem(UDACICARDS_CARDS_KEY)
    .then((results) => {
      let data = JSON.parse(results)[deck];
      data.questions.push({
        question,
        answer,
      });
      AsyncStorage.mergeItem(UDACICARDS_CARDS_KEY, JSON.stringify({
        [deck]: data,
      }));
    });
};

export const addDeckAPI = (title) => {
  return AsyncStorage.mergeItem(UDACICARDS_CARDS_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    },
  }));
};

export const clearDecksAPI = () => {
  const keys = [UDACICARDS_CARDS_KEY];
  AsyncStorage.multiRemove(keys);
}

export const getDeckAPI = (id) => {
  return AsyncStorage.getItem(UDACICARDS_CARDS_KEY).then((data) => {
    return JSON.parse(data)[id];
  });
};

export const getDecksAPI = () => {
  return AsyncStorage.getItem(UDACICARDS_CARDS_KEY).then((data) => {
    return JSON.parse(data);
  });
};






