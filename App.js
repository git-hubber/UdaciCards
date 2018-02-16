import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import DeckListView from './src/components/DeckListView';
import NewDeckView from './src/components/NewDeckView';
import DeckView from './src/components/DeckView';
import NewQuestionView from './src/components/NewQuestionView';
import QuizView from './src/components/QuizView';
import TheStatusBar from './src/components/TheStatusBar';

import { clearDecksAPI } from './src/helpers/api';
import { setLocalNotification } from './src/helpers/notifications';

const store = configureStore();

const platformPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={platformPrefix + '-list'} size={30} color={tintColor} />
      ),
    },
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={platformPrefix + '-add'} size={30} color={tintColor} />
      ),
    },
  },
});

const navigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'blue',
  },
};

const DeckNavigator = StackNavigator({
  DeckView: {
    screen: DeckView,
  },
  NewQuestionView: {
    screen: NewQuestionView
  },
  QuizView: {
    screen: QuizView
  },
}, {
  headerMode: 'none',
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions,
  },
  DeckNavigator: {
    screen: DeckNavigator,
    navigationOptions,
  },
}, {
  headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  };

  render() {
    // clearDecksAPI();
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <TheStatusBar backgroundColor='blue' barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

