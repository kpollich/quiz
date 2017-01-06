import React, { Component } from 'react'

import Header from '../components/Header'
import QuestionListContainer from '../containers/QuestionListContainer'

class App extends Component {
  render () {
    return (
      <div className="app">
        <Header title="Take a Quiz" />
        <QuestionListContainer />
      </div>
    )
  }
}

export default App