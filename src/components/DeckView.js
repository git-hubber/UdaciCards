import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import { startGetDeck } from '../actions';
import styles from '../styles';

class DeckView extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch, deck } = this.props;
    if (deck) {
      dispatch(startGetDeck(deck))
      .then((entries) => this.setState(() => ({
        deck: entries.data,
        ready: true,
      })));
    }
  };

  _addNewCard = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('NewQuestionView', { deck });
  };

  _startQuiz = () => {
    const { questions } = this.state.deck;
    this.props.navigation.navigate('QuizView', { questions });
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return (<AppLoading />);
    }

    const { deck } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.name}>{deck.title}</Text>
          <Text style={styles.counter}>
            {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>

          <TouchableOpacity
            style={ Platform.OS === 'ios'
              ? styles.iosButton
              : styles.mdButton
            }
            onPress={() => this._addNewCard()}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>

          {deck.questions.length > 0 &&
          <TouchableOpacity
            style={ Platform.OS === 'ios'
              ? styles.iosButton
              : styles.mdButton
            }
            onPress={() =>this._startQuiz()}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
};

function mapStateToProps(state, props) {
  let deck = undefined;
  if (props.navigation.state.params) {
    deck = props.navigation.state.params.deck;
  }
  return { deck, state };
};

export default connect(mapStateToProps)(DeckView);
