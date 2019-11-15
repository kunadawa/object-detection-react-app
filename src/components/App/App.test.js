import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import should from "should";

describe("<App/> ", () => {
  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it ('setEventSource should return a new state object with event source', () => {
    const oldState = {};
    should.exist(oldState, 'oldState should be a valid object')
    const eventSource = {};
    should.exist(eventSource, 'eventSource should be a valid object\'')
    const app = new App()
    const newState = app.setEventSource(oldState, eventSource)
    should.exist(newState)
    newState.should.not.equal(oldState)
    should.exist(newState.eventSource)
    newState.eventSource.should.equal(eventSource)
  });

})

