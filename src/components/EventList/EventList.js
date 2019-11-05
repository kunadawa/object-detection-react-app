import React from 'react'

function EventList(props) {
    return (
        <div>
            {
                props.events && props.events.length > 0
                ? <ol>
                        {props.events.map(event => <li key={event}>event</li>)}
                  </ol>
                :  <span>No events available</span>
            }
        </div>
    )
}

export default EventList