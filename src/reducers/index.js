const initialState = {
  questions: [],
  submissions: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_QUESTIONS':
      return { ...state, questions: action.questions }
    case 'UPDATE_QUESTION_ANSWER':
      const updatedQuestions = state.questions.map((question) => {
        return question.id === action.questionId ?
          { ...question, providedAnswer: action.answer} :
          question
      })
      
      return { ...state, questions: updatedQuestions }
    case 'GRADE_QUESTIONS':
      return { ...state, questions: action.questions }
    case 'RECEIVE_SUBMISSION':
      return { ...state, submissions: action.submissions }
    default:
      return state
  }
}

export default reducer