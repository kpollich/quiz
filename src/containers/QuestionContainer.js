import Choice from '../components/Choice'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateQuestionAnswer } from '../actions'

import '../styles/Question.css'

class QuestionContainer extends Component {
  render () {
    const { text } = this.props

    const choices = getChoices(this.props)

    const choiceNodes = Object.keys(choices).map((key) => {
      return <Choice
        letter={key}
        text={choices[key]}
        key={key}
        id={`question-${this.props.id}-choice-${key}`}
        onChange={this.selectChoice}
        checked={this.props.providedAnswer === key}
      />
    })

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
          {choiceNodes}
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

// Massage the data for question choices here a bit to make rendering cleaner
function getChoices(question) {
  return Object.keys(question).reduce((result, key) => {
    const matchInfo = key.match(/^choice_([a-z])$/)

    if (!matchInfo) {
      return result
    }

    const choiceLetter = matchInfo[1]
    result[choiceLetter] = question[key]

    return result
  }, {})
}

export default connect()(QuestionContainer)
