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
                <div className='row'>
                    <span className='col bg-dark text-white display-6'>
                        {`${_.truncate(props.events[0].instanceName, {length: props.eventHeaderMaxLen})} / ${_.truncate(props.events[0].source, {length: props.eventHeaderMaxLen})}`}
                    </span>
                    <span className={`col ${unseen > 0 ? 'bg-danger' : 'bg-info'} display-4`}>
                        {
                            `${unseen}`
                        }
                    </span>
                </div>
                <EventImage event={props.events[props.events.length - 1]}/>
            </div>
            :
            <span>No events available</span>
    )
}

export default EventList