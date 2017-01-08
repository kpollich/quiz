import React, { Component } from 'react'

class Notes extends Component {
  render() {
    const { submissions, numSubmissionsAllowed, numberCorrect} = this.props
    let notes = ''

    const maxSubmissionsReached = (submissions === numSubmissionsAllowed)

    if (submissions === 0) {
      notes = (
        <div className="quiz-notes">
          <p>The quiz below is made up of 10 multiple choice questions. You may answer
          the questions in any order you'd like. Press the "Submit Answers" button at
          the bottom of the quiz when you are finished to receive your grade.</p>

          <p>Note: You are allowed up to {numSubmissionsAllowed} submissions.
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

          <p>Note: You are allowed up to {numSubmissionsAllowed} submissions.
          You have submitted {submissions} time(s) so far.</p>
        </div>
      )
    }

    return notes
  }
}

export default Notes
