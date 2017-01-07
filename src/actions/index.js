export const receiveQuestions = (questions) => {
  return {
    type: 'RECEIVE_QUESTIONS',
    questions
  }
}

export const updateQuestionAnswer = (questionId, answer) => {
  return { 
    type: 'UPDATE_QUESTION_ANSWER',
    questionId,
    answer
  }
}

export const gradeQuestions = (questions) => {
  return {
    type: 'GRADE_QUESTIONS',
    questions
  }
}

export const receiveSubmission = (submissions) => {
  return {
    type: 'RECEIVE_SUBMISSION',
    submissions
  }
}