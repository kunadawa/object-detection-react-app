import React from 'react'

import {STREAM_HOST} from '../../api/stream-api'

function EventList(props) {
    return (
        <div>
                {
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
                                src={`${STREAM_HOST}${props.events[props.events.length - 1].stringMap['frame_path']}`}
                                alt='Frame'
                            />
                        </div>
                        :
                        <span>No events available</span>
                }
        </div>
    )
}

export default EventList