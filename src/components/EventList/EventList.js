import React from 'react';
const _ = require('lodash');

function EventList(props) {
    return (
        props.events && props.events.length > 0
            ?
            <div className={`col-${12/props.rowSize}`}>
                <div className='row'>
                    <span className='col'>
                        {`${_.truncate(props.events[0].instanceName, {length: props.eventHeaderMaxLen})} / ${_.truncate(props.events[0].source, {length: props.eventHeaderMaxLen})}`}
                    </span>
                    <span className='col'>
                        {
                            `${(props.events.filter(event => !event.seen)).length}`
                        }
                    </span>
                </div>
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