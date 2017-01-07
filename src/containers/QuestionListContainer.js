import { connect } from 'react-redux'
import QuestionContainer from '../containers/QuestionContainer'
import questions from '../data/questions'
import React, { Component } from 'react'
import { shuffle, take } from 'lodash'

import { gradeQuestions, receiveQuestions, receiveSubmission } from '../actions'

import '../styles/QuestionList.css'

const NUM_QUESTIONS = 10
const NUM_SUBMISSIONS_ALLOWED = 2

class QuestionListContainer extends Component {
  constructor (props) {
    super(props)

    const { dispatch } = this.props

    // Get the base set of questions and put them in our state
    const questions = getQuestionSet()
    dispatch(receiveQuestions(questions))
  }

  render () {
    const { submissions, questions } = this.props

    const numberCorrect = questions.filter((question) => question.isCorrect).length
    const maxSubmissionsReached = (submissions === NUM_SUBMISSIONS_ALLOWED)

    // Display remaining submissions, score, etc
    const notes = getNotes(submissions, numberCorrect, maxSubmissionsReached)

    const questionContainerNodes = questions.map((question, index) => {
      return <QuestionContainer
        key={index}
        index={index}
        {...question}
      />
    })

    let submitButton = ''

    // Don't allow submissions when the maximum number of submissions has been reached
    if (!maxSubmissionsReached) {
      submitButton = <input type="submit" className="submit" value="Submit Answers" />
    }

    return (
      <div className="quiz-container">
        {notes}

        <form className="question-list-container" onSubmit={this.onSubmit}>
          {questionContainerNodes}
          {submitButton}
        </form>
      </div>
    )
  }

  onSubmit = (event) => {
    const { dispatch, questions, submissions } = this.props
    event.preventDefault()

    const gradedQuestions = getGradedQuestions(questions)
    const newSubmissions = submissions + 1

    // Update state with graded questions and the new number of submissions received
    dispatch(gradeQuestions(gradedQuestions))
    dispatch(receiveSubmission(newSubmissions))

    // Jump back to the top and show score, notes, etc
    window.scrollTo(0, 0)
  }
}

// Get a random set of N questions from the data set
function getQuestionSet () {
  // Some questions have a 'justification' property, and the questions don't make much
  // sense. Without clarification, just filter these out for now. Also, add an `id`
  // property to each questions to make state updates easier.
  const massagedQuestions = questions
    .filter((q) => !q.justification)
    .map((question, index) => {
      question.id = index
      return question
    })

  return take(shuffle(massagedQuestions), NUM_QUESTIONS)
}

function getGradedQuestions (questions) {
  questions.forEach((question) => {
    if (!question.providedAnswer) {
      question.isCorrect = false
      return
    }

    question.isCorrect = question.answer.toLowerCase() === question.providedAnswer.toLowerCase()
  })

  return questions
}

function getNotes(submissions, numberCorrect, maxSubmissionsReached) {
  let notes = ''

  if (submissions === 0) {
    notes = (
      <div className="quiz-notes">
        <p>The quiz below is made up of 10 multiple choice questions. You may answer
        the questions in any order you'd like. Press the "Submit Answers" button at
        the bottom of the quiz when you are finished to receive your grade.</p>

        <p>Note: You are allowed up to {NUM_SUBMISSIONS_ALLOWED} submissions.
        You have submitted {submissions} time(s) so far.</p>
      </div>
    )
  } else if (maxSubmissionsReached) {
     notes = (
      <div className="quiz-notes">
        You have reached the maximum number of submissions for this quiz, and
        further submissions will not be accepted. Your final score
        was <strong>{numberCorrect}/10</strong>.
      </div>
    )
  } else {
    notes = (
      <div className="quiz-notes">
        <p>Your score was {numberCorrect}/10. Questions answered correctly are marked
        in green below, and incorrect questions are marked in red.</p>

        <p>Note: You are allowed up to {NUM_SUBMISSIONS_ALLOWED} submissions.
        You have submitted {submissions} time(s) so far.</p>
      </div>
    )
  }

  return notes
}

function mapStateToProps (state) {
  return {
    questions: state.questions,
    submissions: state.submissions
  }
}

export default connect(mapStateToProps)(QuestionListContainer)
