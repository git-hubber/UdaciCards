import {
  ADD_CARD,
  ADD_DECK,
  GET_DECK,
  GET_DECKS,
} from '../actions/types';

import {
  addCardAPI,
  addDeckAPI,
  getDeckAPI,
  getDecksAPI,
} from '../helpers/api';

const getDecks = (data) => {
  return {
    type: GET_DECKS,
    data,
  };
};

export const startGetDecks = () => (dispatch) => {
  return getDecksAPI()
    .then((entries) => {
      return dispatch(getDecks(entries));
    });
};

const getDeck = (key, data) => {
  return {
    type: GET_DECK,
    key,
    data,
  };
};

export const startGetDeck = (deck) => (dispatch) => {
  return getDeckAPI(deck)
    .then((entries) => {
      return dispatch(getDeck(deck, entries));
    });
};

const addDeck = (data) => {
  return {
    type: ADD_DECK,
    data,
  };
};

export const startAddDeck = (title) => (dispatch) => {
  addDeckAPI(title);
  const data = { title };
  dispatch(addDeck(data));
}

const addCard = (data) => {
  return {
    type: ADD_CARD,
    data,
  };
};

export const startAddCard = (data) => (dispatch) => {
  addCardAPI(data);
  dispatch(addCard(data));
}