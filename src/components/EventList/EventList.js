import React, {Component} from 'react'

class EventList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.events && this.props.events.length > 0
                    ? <ol>
                            {this.props.events.map(event => <li key={event}>event</li>)}
                      </ol>
                    :  <span>No events available</span>
                }
            </div>
        )
    }
}

export default EventList