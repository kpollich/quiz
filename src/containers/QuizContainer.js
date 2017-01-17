import { connect } from 'react-redux'
import Notes from '../components/Notes'
import QuestionContainer from '../containers/QuestionContainer'
import React, { Component } from 'react'
import * as utils from '../utils'

import { gradeQuestions, receiveQuestions, receiveSubmission } from '../actions'

import '../styles/Quiz.css'

const NUM_SUBMISSIONS_ALLOWED = 2

class QuizContainer extends Component {
  constructor (props) {
    super(props)

    const { dispatch } = this.props

    // Get the base set of questions and put them in our store
    const questions = utils.getQuestionSet()
    dispatch(receiveQuestions(questions))
  }

  render () {
    const { submissions, questions } = this.props

    const numberCorrect = questions.filter((question) => question.isCorrect).length
    const maxSubmissionsReached = (submissions === NUM_SUBMISSIONS_ALLOWED)

    const questionContainerNodes = questions.map((question, index) => {
      return <QuestionContainer
        key={index}
        index={index}
        {...question}
      />
    })

    let submitButton = maxSubmissionsReached ? '' : <input type="submit" className="submit" value="Submit Answers" />

    return (
      <div className="quiz-container">
        <Notes {...{ submissions, maxSubmissionsReached, numberCorrect, numSubmissionsAllowed: NUM_SUBMISSIONS_ALLOWED }} />

        <form className="quiz-form" onSubmit={this.onSubmit}>
          {questionContainerNodes}
          {submitButton}
        </form>
      </div>
    )
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { dispatch, questions, submissions } = this.props
    
    const gradedQuestions = utils.getGradedQuestions(questions)
    const newSubmissions = submissions + 1

    // Update state with graded questions and the new number of submissions received
    dispatch(gradeQuestions(gradedQuestions))
    dispatch(receiveSubmission(newSubmissions))

    // Jump back to the top and show score, notes, etc
    window.scrollTo(0, 0)
  }
}

function mapStateToProps (state) {
  return {
    questions: state.questions,
    submissions: state.submissions
  }
}

export default connect(mapStateToProps)(QuizContainer)
