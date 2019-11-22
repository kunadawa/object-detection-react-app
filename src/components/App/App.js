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
      // TODO - when routing is present, use it to choose what to render - events, history, settings
      const instanceName = 'instance 01 - the first instance';
      const sampleImages = ['./sample-images/cow-boys.jpg', './sample-images/foot-stuck.jpg'];
      let sources = {};
      [...Array(4).keys()].map(x => {
          const source = `source ${x} - the ${x} source`;
          sources = {
          ...sources,
          [source]:
              [
                  {
                      instanceName: instanceName,
                      source: source,
                      stringMap: {frame_path: sampleImages[Math.ceil(Math.random() * 2) - 1]}
                  },
                  {
                      instanceName: instanceName,
                      source: source,
                      stringMap: {frame_path: sampleImages[Math.ceil(Math.random() * 2) - 1]}
                  }
              ]
          }
          // returning this to keep the linter happy
          return 0;
      })

      const events = {
            instanceName : {...sources}
      };
      const streamHost = '';
      // TODO provide real event data including offline image for testing boxes and labels
    return (
        // TODO events title to be part of nav bar
        <div className="App container-fluid">
          <h2>Events</h2>
          <div className='row'>
              {
              this.getEventLists(events).map(list => <EventList key={`${list[0].instanceName} - ${list[0].source}`} events={list} streamHost={streamHost}/>)
              }
          </div>
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
      let lists = [];
      Object.keys(eventsState).map(instanceName => {
          return Object.keys(eventsState[instanceName]).map(source => lists = lists.concat([eventsState[instanceName][source]]))
      });
      return lists;
  }
}

export default App;
