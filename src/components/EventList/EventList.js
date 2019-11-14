import React from 'react'

function EventList(props) {
    return (
        <div>
            <h3>Events ({props.events? props.events.length: 0})</h3>
            {
                props.events && props.events.length > 0
                ? <ol>
                        {props.events.map(event => <li key={event.stringMap.id}>{`${event.instanceName} - ${event.source} : ${JSON.stringify(event)}`}</li>)}
                  </ol>
                :  <span>No events available</span>
            }
        </div>
    )
}

export default EventList