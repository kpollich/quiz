import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoiceListContainer from './ChoiceListContainer'
import { updateQuestionAnswer } from '../actions'

import '../styles/Question.css'

class QuestionContainer extends Component {
  render () {
    const { text } = this.props

    let className = 'question'

    // If the quiz has been submitted, we can indicate correctness, otherwise
    // we have nothing to display here, so just use the default class name
    if (this.props.hasOwnProperty('isCorrect')) {
      className = `question ${this.props.isCorrect ? 'correct' : 'incorrect'}`
    }

    return (
      <div className={className}>
        <h3>{this.props.index + 1}. {text}</h3>
        <div className="question-choices">
          <ChoiceListContainer {...this.props} />
        </div>
      </div>
    )
  }

  selectChoice = (event) => {
    const { dispatch, id } = this.props
    const answer = event.target.value

    dispatch(updateQuestionAnswer(id, answer))
  }
}

export default connect()(QuestionContainer)
