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
      register_stream_callback(this.stream_callback)
  }

  stream_callback = (event) => {
    this.setState(oldState => ({
      events: oldState.events.concat(JSON.parse(event.data))
    }))
  }
}

export default App;
