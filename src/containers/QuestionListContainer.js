import QuestionContainer from '../containers/QuestionContainer'
import questions from '../data/questions'
import React, { Component } from 'react'
import { shuffle, take } from 'lodash'

import '../styles/QuestionList.css'

const NUM_QUESTIONS = 10
const NUM_SUBMISSIONS_ALLOWED = 2

class QuestionListContainer extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      questions: getQuestionSet(),
      submissions: 0,
      numberCorrect: 0,
      maxSubmissionsReached: false
    }
  }
  
  render () {    
    if (this.state.maxSubmissionsReached) {
      return (
        <div className="quiz-notes">
          You have reached the maximum number of submissions for this quiz, and
          further submissions will not be accepted. Your final score was <strong>{this.state.numberCorrect}/10</strong>.
        </div>
      )
    }
    
    let scoreNode = ''
    
    if (this.state.submissions > 0) {
      scoreNode = (
        <p className="quiz-notes">
          Your score was {this.state.numberCorrect}/10. Questions answered correctly are marked
          in green below, and incorrect questions are marked in red.
        </p>
      )
    }
    
    const questionContainerNodes = this.state.questions.map((question, index) => {
      return <QuestionContainer
        question={question}
        key={index}
        id={index}
        selectAnswer={this.selectAnswer}
      />
    })
    
    return (
      <div className="quiz-container">
        {scoreNode}
        <p className="quiz-notes">
          Note: You are allowed up to {NUM_SUBMISSIONS_ALLOWED} submissions.
          You have submitted {this.state.submissions} time(s) so far.
        </p>
        
        <form className="question-list-container" onSubmit={this.onSubmit}>
          {questionContainerNodes}
          <input type="submit" className="submit" value="Submit Answers" />
        </form>
      </div>
    )
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    
    const questions = gradeQuestions(this.state.questions)
    const numberCorrect = questions.filter((question) => question.isCorrect).length
    
    const submissions = this.state.submissions + 1
    const maxSubmissionsReached = submissions === NUM_SUBMISSIONS_ALLOWED
    
    this.setState({ questions , submissions, numberCorrect, maxSubmissionsReached })
    
    // Jump back to the top and show score, notes, etc
    window.scrollTo(0, 0)
  }
  
  selectAnswer = (answer, id) => {
    const questions = this.state.questions
    questions[id].providedAnswer = answer
    
    this.setState({ questions })
  }
}

// Get a random set of N questions from the data set
function getQuestionSet () {
  // Some questions have a 'justification' property, and the questions don't make much
  // sense. Without clarification, just filter these out for now.
  return take(shuffle(questions.filter((q) => !q.justification)), NUM_QUESTIONS)
}

function gradeQuestions (questions) {
  questions.forEach((question) => {
    if (!question.providedAnswer) {
      question.isCorrect = false
      return
    }
    
    question.isCorrect = question.answer.toLowerCase() === question.providedAnswer.toLowerCase()
  })
  
  return questions
}

export default QuestionListContainer