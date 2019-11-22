import React from 'react'

function EventList(props) {
    return (
        props.events && props.events.length > 0
            ?
            <div className='col-4'>
                <div className='row'>
                    <h5 className='col'>{`${props.events[0].instanceName} - ${props.events[0].source}`}</h5>
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