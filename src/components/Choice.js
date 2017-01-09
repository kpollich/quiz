import React, { Component } from 'react'

import '../styles/Choice.css'

class Choice extends Component {
  render () {
    return (
      <div className="choice">
        <input 
          type="radio" 
          onChange={this.props.onChange} 
          checked={this.props.checked} 
          value={this.props.letter}
          id={this.props.id}
        />
        
        <label className="choice-label" htmlFor={this.props.id}>{this.props.letter} - {this.props.text}</label>
      </div>
    )
  }
}

export default Choice