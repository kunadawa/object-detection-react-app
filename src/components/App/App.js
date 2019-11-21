import React, {Component} from 'react';
import {register_stream_callback} from "../../api/stream-api";
import EventList from "../EventList/EventList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        events:{},
    }
  }

  render() {
    return (
        // TODO - when routing is present, use it to choose what to render - events, history, settings
      <div className="App">
          <h2>Events</h2>
          {this.getEventLists(this.state.events).map(list => <EventList key={`${list[0].instanceName} - ${list[0].source}`} events={list}/>)}
      </div>
    );
  }

  componentDidMount() {
      // https://www.w3schools.com/html/html5_serversentevents.asp
      if (typeof (EventSource) !== "undefined") {
          register_stream_callback(this.stream_callback)
      } else {
          console.log("componentDidMount() - event source is not supported, therefore no callbacks registered")
      }
  }

    /**
     * add an event to  state, to a unique list for each instance-source combination
     * @param oldState - the old state
     * @param eventData - event data from a server sent event
     */
  addEvent = (oldState, eventData) => {
    return {
          ...oldState,
          events: {
            ...oldState.events,
            [eventData.instanceName]: {
                ...oldState.events[eventData.instanceName],
                [eventData.source]:
                    typeof(oldState.events[eventData.instanceName]) === 'undefined'
                        ?
                        [eventData]
                        :
                        typeof(oldState.events[eventData.instanceName][eventData.source]) === 'undefined'
                            ?
                            [eventData]
                            :
                            oldState.events[eventData.instanceName][eventData.source].concat(eventData)
            }
          }
      };
  }

  stream_callback = (serverEvent) => {
      const data = JSON.parse(serverEvent.data)
      this.setState(oldState => this.addEvent(oldState, data));
  }

  getEventLists = (eventsState) => {
      return Object.keys(eventsState).map(instanceName => {
          // the map() will wrap the results in an array, 'unwrap' by asking for the sole array entry
          return Object.keys(eventsState[instanceName]).map(source => eventsState[instanceName][source])[0];
      });
  }
}

export default App;
