import React, {Component} from 'react';
import {register_stream_callback} from "../../api/stream-api";
import EventList from "../EventList/EventList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        events:[],
        streamStatus:{}
    }
  }

  render() {
    return (
      <div className="App">
        <EventList events={this.state.events}/>
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
     * update oldState to reflect the current frame count for each instance-source combination
     * @param oldState - the old state
     * @param eventData - event data from a server sent event
     */
  updateStreamStatus = (oldState, eventData) => {
    return {
          ...oldState,
          streamStatus: {
            ...oldState.streamStatus,
            [eventData.instanceName]: {
                ...oldState.streamStatus[eventData.instanceName],
                [eventData.source]: eventData.frameCount
            }
          }
      };
  }

  stream_callback = (serverEvent) => {
      const data = JSON.parse(serverEvent.data)
      // TODO create state variables for each instance-source (e.g. as a nested object)
      //  and store the events under each, then connect each to an event list component
      console.log(data)
      this.setState(oldState => ({
        events: oldState.events.concat(data)
      }));
      this.setState(oldState => this.updateStreamStatus(oldState, data));
  }
}

export default App;
