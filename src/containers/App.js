import React, { Component } from 'react'

import Header from '../components/Header'
import QuizContainer from '../containers/QuizContainer'

class App extends Component {
  render () {
    return (
      <div className="app">
        <Header title="Take a Quiz" />
        <QuizContainer />
      </div>
    )
  }
}

export default App