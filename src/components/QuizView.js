import React, { Component } from 'react';
import {
  Animated,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../helpers/notifications';

class QuizView extends Component {
  state = {
    position: 0,
    correct: 0,
    incorrect: 0,
    bounceValue: new Animated.Value(1),
    shownItem: 'question',
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  _answerQuestion = (action) => {
    const { position, shownItem } = this.state;
    this.setState({
      [action]: this.state[action] + 1,
      position: position + 1,
      shownItem: 'question',
    });
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _restartQuiz = () => {
    this.setState({
      position: 0,
      correct: 0,
      incorrect: 0,
      shownItem: 'question',
    });
  };

  _toggleAnswer = () => {
    const { bounceValue, shownItem } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.1 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 5 }),
    ]).start();
    this.setState({
      shownItem: shownItem === 'question' ? 'answer' : 'question',
    });
  };

  _renderScore() {
    const { questions } = this.props;
    const { correct } = this.state;
    const questionsCount = questions.length;

    return (
      <View style={styles.center}>
        <Text style={styles.score}>Correct Answers</Text>
        <Text style={styles.score}>{correct} of {questionsCount}</Text>

        <TouchableOpacity
          style={[platformStyleButton, { backgroundColor: 'red' }]}
          onPress={() => this._restartQuiz()}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={platformStyleButton}
          onPress={() => this._goBack()}
        >
          <Text style={styles.buttonText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { questions } = this.props;
    const { position, bounceValue, shownItem } = this.state;
    const questionsCount = questions.length;

    if (position > questionsCount - 1) {
      return this._renderScore();
    }

    const item = questions[position];
    const buttonText = shownItem === 'question' ? 'Show Answer' : 'Show Question';

    return (
      <View style={styles.container}>
        <Text style={{color: 'blue', fontSize: 30 }}>{position + 1}/{questionsCount}</Text>

        <View style={styles.center}>

          <Animated.Text
            style={[styles.heading, { transform: [{ scale: bounceValue }] }]}
          >
            {shownItem}:{"\n"}{item[shownItem]}
          </Animated.Text>

          <TouchableOpacity
            onPress={() => this._toggleAnswer()}
          >
            <Text style={styles.toggleText}>{buttonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[platformStyleButton, { backgroundColor: 'green' }]}
            onPress={() => this._answerQuestion('correct')}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[platformStyleButton, { backgroundColor: 'red' }]}
            onPress={() => this._answerQuestion('incorrect')}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const platformStyleButton = Platform.OS === 'ios' ? styles.iosButton : styles.mdButton;


function mapStateToProps(state, props) {
  const { questions } = props.navigation.state.params;
  return { state, questions };
};

export default connect(mapStateToProps)(QuizView);
