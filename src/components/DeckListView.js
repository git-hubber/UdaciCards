import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import { startGetDecks } from '../actions';
import styles from '../styles';

class DeckListView extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startGetDecks())
      .then(() => this.setState(() => ({ ready: true })));
  };

  _goToDeck = (deck) => {
    const { navigate } = this.props.navigation;
    navigate('DeckView',  { deck } );
  };

  render() {
    const { ready } = this.state;

    if (!ready) {
      return (<AppLoading />);
    }

    const { decks, state } = this.props;

    if (decks && decks.length === 0) {
      return (
        <View style={styles.center}>
          <Text>There are no decks</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {decks.map((item) => (
          <TouchableHighlight
            key={item}
            style={styles.deck}
            onPress={() => this._goToDeck(item)}
          >
            <View>
              <Text style={styles.name}>{item}</Text>
              <Text style={styles.counter}>
                {state[item].questions.length} {state[item].questions.length === 1 ? 'card' : 'cards'}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const decks = Object.keys(state) || [];

  return { decks, state };
};

export default connect(mapStateToProps)(DeckListView);