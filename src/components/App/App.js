import React, {Component} from 'react';
import {register_stream_callback} from "../../api/stream-api";
import EventList from "../EventList/EventList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {events:[]}
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
          const eventSource = register_stream_callback(this.stream_callback)
          this.setState(oldState => this.setEventSource(oldState, eventSource))
      } else {
          console.log("componentDidMount() - event source is not supported, therefore no callbacks registered")
      }
  }

    /**
     * update the state with event source
     * @param oldState
     */
  setEventSource = (oldState, eventSource) => {
      return {
          ...oldState,
          eventSource
      };
  }

  stream_callback = (serverEvent) => {
      const data = JSON.parse(serverEvent.data)
      // TODO create state variables for each instance-source (e.g. as a nested object)
      //  and store the frame count, then add them to the HTTP event source URL (will I need to deregister the earlier URI)
      // might have to return the event listener and store a ref here?
      console.log(data)
      data.frame = 'work/in/progress'
      this.setState(oldState => ({
        events: oldState.events.concat(data)
      }))
  }
}

export default App;
