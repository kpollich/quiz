import questionSet from '../data/questions'
import { shuffle, take } from 'lodash'

const NUM_QUESTIONS = 10

// Get a random set of N questions from the data set
exports.getQuestionSet = () => {
  // Some questions have a 'justification' property, and the questions don't make much
  // sense. Without clarification, just filter these out for now. Also, add an `id`
  // property to each question to make state updates easier.
  const massagedQuestions = questionSet
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

exports.getGradedQuestions = (questions) => {
  questions.forEach((question) => {
    if (!question.providedAnswer) {
      question.isCorrect = false
      return
    }

    question.isCorrect = question.answer.toLowerCase() === question.providedAnswer.toLowerCase()
  })

  return questions
}