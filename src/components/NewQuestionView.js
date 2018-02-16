import React, { Component } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { startAddCard } from '../actions';
import styles from '../styles';

class NewQuestionView extends Component {

  state = {
    question: '',
    answer: ''
  };

  static navigationOptions = () => ({
    title: 'New Card',
  });

  _newQuestion = (another) => {
    const { question, answer }  = this.state;
    const { deck } = this.props;

    this.props.dispatch(startAddCard({ question, answer, deck }));

    if (!another) this.props.navigation.goBack();
    this.setState(() => ({ question: '', answer: '' }));
    this.refs['question'].focus();
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Enter the question:</Text>
        <TextInput
          autoFocus
          ref='question'
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <Text style={[styles.heading, { paddingTop: 10 }]}>Enter the answer to the question:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity
          style={ Platform.OS === 'ios'
            ? styles.iosButton
            : styles.mdButton
          }
          onPress={() => this._newQuestion(true)}
        >
          <Text style={styles.buttonText}>Save and Another</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ Platform.OS === 'ios'
            ? styles.iosButton
            : styles.mdButton
          }
          onPress={() => this._newQuestion(false)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps)(NewQuestionView);
