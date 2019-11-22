import React from 'react'

function EventList(props) {
    return (
        props.events && props.events.length > 0
            ?
            <div>
                <h3>{`${props.events[0].instanceName} - ${props.events[0].source}`}</h3>
                <span>
                    {
                        `${(props.events.filter(event => !event.seen)).length}`
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