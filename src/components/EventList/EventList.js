import React from 'react'

function EventList(props) {
    return (
        <div>
            {
                props.events && props.events.length > 0
                ? <ol></ol>
                :  <span>No events available</span>
            }
        </div>
    )
}

export default EventList