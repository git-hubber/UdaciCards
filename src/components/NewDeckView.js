import React, { Component } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { startAddDeck } from '../actions';
import styles from '../styles';

class NewDeckView extends Component {
  state = {
    title: '',
  }

  _newDeck = () => {
    const { title }  = this.state;

    this.props.dispatch(startAddDeck(title));

    this.setState(() => ({ title: '' }));

    this.props.navigation.navigate('DeckView',  { deck: title } );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What is the name of the new deck?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}/>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosButton : styles.mdButton}
          onPress={this._newDeck}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

export default connect()(NewDeckView);