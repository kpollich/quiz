import { connect } from 'react-redux'
import Notes from '../components/Notes'
import QuestionContainer from '../containers/QuestionContainer'
import questions from '../data/questions'
import React, { Component } from 'react'
import { shuffle, take } from 'lodash'

import { gradeQuestions, receiveQuestions, receiveSubmission } from '../actions'

import '../styles/Quiz.css'

const NUM_QUESTIONS = 10
const NUM_SUBMISSIONS_ALLOWED = 2

class QuizContainer extends Component {
  constructor (props) {
    super(props)

    const { dispatch } = this.props

    // Get the base set of questions and put them in our store
    const questions = getQuestionSet()
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
  // property to each question to make state updates easier.
  const massagedQuestions = questions
    .filter((q) => !q.justification)
    .map((question, index) => {
      question.id = index

      // Questions in the data set have properties like "choice_a", "choice_b", etc. Reduce
      // those properties into an object instead to make them a bit easier to access.
      question.choices = Object.keys(question).reduce((result, key) => {
        const matchInfo = key.match(/^choice_([a-z])$/)

        if (!matchInfo) {
          return result
        }

        const choiceLetter = matchInfo[1]
        result[choiceLetter] = question[key]

        return result
      }, {})

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

function mapStateToProps (state) {
  return {
    questions: state.questions,
    submissions: state.submissions
  }
}

export default connect(mapStateToProps)(QuizContainer)
