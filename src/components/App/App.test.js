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

  it ('updateStreamStatus when state does not contain stream status', () => {
      const app = new App();
      // streamStatus should be initialized to empty object
      const oldState = {streamStatus:{}};
      const instanceName = 'test';
      const source = 'https://streamX';
      const frameCount = 11;
      // streamStatus keys will be instance ids/names then have nested source:frame-count objects
      const expectedStreamStatus = {[instanceName]: {[source]: frameCount}};
      const eventData = {instanceName, source, frameCount};
      const newState = app.updateStreamStatus(oldState, eventData);

      should.exist(newState);
      newState.streamStatus.should.deepEqual(expectedStreamStatus)
  });

   it ('updateStreamStatus when state does contains similar instance & source stream status', () => {
      const app = new App();
      const instanceName = 'test';
      const source = 'https://streamX';
      const frameCount = 11;
      const oldState = {
          streamStatus: {[instanceName]: {[source]: frameCount}}
      };
      const newFrameCount = 45;
      // streamStatus keys will be instance ids/names then have nested source:frame-count objects
      const expectedStreamStatus = {[instanceName]: {[source]: newFrameCount}};
      const eventData = {instanceName, source, frameCount:newFrameCount};
      const newState = app.updateStreamStatus(oldState, eventData);

      should.exist(newState);
      newState.streamStatus.should.deepEqual(expectedStreamStatus)
  });

   it ('updateStreamStatus when state contains similar instance, but different source stream status', () => {
      const app = new App();
      const instanceName = 'test';
      const source = 'https://streamX';
      const frameCount = 11;
      const oldState = {
          streamStatus: {[instanceName]: {[source]: frameCount}}
      };
      const newFrameCount = 51;
      const newSource = "file://here/there";
      // streamStatus keys will be instance ids/names then have nested source:frame-count objects
      const expectedStreamStatus = {[instanceName]: {[source]: frameCount, [newSource]: newFrameCount}};
      const eventData = {instanceName, source:newSource, frameCount:newFrameCount};
      const newState = app.updateStreamStatus(oldState, eventData);

      should.exist(newState);
      newState.streamStatus.should.deepEqual(expectedStreamStatus)
  });

   it ('updateStreamStatus when state contains different instance & source stream status', () => {
      const app = new App();
      const instanceName = 'test';
      const source = 'https://streamX';
      const frameCount = 11;
      const oldState = {
          streamStatus: {[instanceName]: {[source]: frameCount}}
      };
      const newFrameCount = 51;
      const newSource = "file://here/there";
      const newInstance = "area 51";
      // streamStatus keys will be instance ids/names then have nested source:frame-count objects
      const expectedStreamStatus = {[instanceName]: {[source]: frameCount}, [newInstance]: {[newSource]: newFrameCount}};
      const eventData = {instanceName: newInstance, source:newSource, frameCount:newFrameCount};
      const newState = app.updateStreamStatus(oldState, eventData);

      should.exist(newState);
      newState.streamStatus.should.deepEqual(expectedStreamStatus)
  });

})

