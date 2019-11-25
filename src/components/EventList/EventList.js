import React from 'react';
const _ = require('lodash');

function EventList(props) {
    let unseen = 0;
    if (props.events) {
        unseen = (props.events.filter(event => !event.seen)).length;
    }
    return (
        props.events && props.events.length > 0
            ?
            <div className={`col-${12/props.rowSize}`}>
                <h5 className='col bg-dark text-white'>
                    {`${_.truncate(props.events[0].instanceName, {length: props.eventHeaderMaxLen})} / ${_.truncate(props.events[0].source, {length: props.eventHeaderMaxLen})}`}
                </h5>
                <span className={`col ${unseen > 0 ? 'bg-danger' : 'bg-info'} display-1`}>
                    {
                        `${unseen}`
                    }
                </span>
                <img
                    src={`${props.streamHost}${props.events[props.events.length - 1].stringMap['frame_path']}`}
                    alt='Frame'
                />
            </div>
            :
            <span>No events available</span>
    )
}

export default EventList