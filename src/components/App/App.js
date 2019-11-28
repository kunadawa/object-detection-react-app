import React, {Component} from 'react';
import {register_stream_callback, STREAM_HOST} from "../../api/stream-api";
import EventList from "../EventList/EventList";
import Viewer from "../Viewer/Viewer";
import {getEventLists, generateEventRows, addEvent, setEventList} from "../../utils/event-utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        events:{},
        eventsRowSize:3,
        eventHeaderMaxLen:30
    }
  }

  render() {
      // TODO - when routing is present, use it to choose what to render - events, history, settings
      const streamHost = STREAM_HOST;
      // TODO provide real event data including offline image for testing boxes and labels
    return (
        // TODO events title to be part of nav bar
        <div className="App container-fluid">
            <h2>Events</h2>
            <div>
                {
                    generateEventRows(getEventLists(this.state.events), this.state.eventsRowSize).map (
                        row => <div className='row mt-2' key={`${row[0][0].instanceName} - ${row[0][0].source}`}>
                          {
                              row.map(eventList => <EventList
                                  key={`${eventList[0].instanceName} - ${eventList[0].source}`}
                                  events={eventList}
                                  streamHost={streamHost}
                                  rowSize = {this.state.eventsRowSize}
                                  eventHeaderMaxLen = {this.state.eventHeaderMaxLen}
                                  viewEvents = {this.viewEvents}
                              />)
                          }
                            </div>
                      )
                }
            </div>
            <Viewer show={this.state.showViewer} events={this.state.eventsToView} hide={this.hideViewer} streamHost={streamHost}/>
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
     * handle a server sent event
     * @param serverEvent - the event
     */
    stream_callback = (serverEvent) => {
      const data = JSON.parse(serverEvent.data)
      this.setState(oldState => addEvent(oldState, data));
    }

    /**
    * launch Viewer for the given events
    * @param events
    */
    viewEvents = (events) => {
      this.setState(oldState => (
          {
              ...oldState,
              eventsToView:events,
              showViewer:true
          }
      ))
    }

    /**
     * hide the event viewer and update the events list in state
     */
    hideViewer = (eventList) => {
        this.setState(oldState => ({
          ...setEventList(eventList, eventList[0].instanceName, eventList[0].source, oldState),
          showViewer:false
        }));
    }
}

export default App;
