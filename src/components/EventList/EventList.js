import React from 'react';
import './EventList.css';
import EventImage from "../EventImage/EventImage";
const _ = require('lodash');

function EventList(props) {
    let unseen = 0;
    if (props.events) {
        unseen = (props.events.filter(event => !event.seen)).length;
    }
    return (
        props.events && props.events.length > 0
            ?
            <div className='col border event-list' onClick={() => props.viewEvents(props.events)}>
                <span className=' bg-dark text-white display-6' >
                        {`${_.truncate(props.events[0].instanceName, {length: props.eventHeaderMaxLen})} / ${_.truncate(props.events[0].source, {length: props.eventHeaderMaxLen})}`}
                </span>
                <EventImage event={props.events[props.events.length - 1]}/>
                <span className={`${unseen > 0 ? 'bg-danger' : 'bg-info'} display-6 unseen-count`}>
                    {
                        `${unseen}`
                    }
                </span>
            </div>
            :
            <span>No events available</span>
    )
}

export default EventList