import React, { Component } from 'react'
import { connect } from 'react-redux'

import Choice from '../components/Choice'

import { updateQuestionAnswer } from '../actions'

class ChoiceListContainer extends Component {
  render () {
    const { choices, providedAnswer, id } = this.props
    
    const choiceNodes = Object.keys(choices).map((key) => {
      return <Choice
        letter={key}
        text={choices[key]}
        key={key}
        id={`question-${id}-choice-${key}`}
        onChange={this.selectChoice}
        checked={providedAnswer === key}
      />
    })

    return (
      <div className="choice-list-container">
        {choiceNodes}
      </div>
    )
  }

   selectChoice = (event) => {
    const { dispatch, id } = this.props
    const answer = event.target.value

    dispatch(updateQuestionAnswer(id, answer))
  }
}

export default connect()(ChoiceListContainer)