import React from "react";
import {Carousel, Modal} from 'react-bootstrap'
import EventImage from "../EventImage/EventImage";

function Viewer(props) {
    return (
        <Modal
            show={props.show}
            onHide={() => {props.events[0].seen = true; props.hide(props.events)}}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.events ? `${props.events[0].instanceName} / ${props.events[0].source}` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel interval={false} onSelect={index => props.events[index].seen = true}>
                    {
                        props.events
                            ?
                            props.events.map(event => (
                                <Carousel.Item key={`${event.stringMap['frame_path']}`}>
                                    <EventImage event={event}/>
                                </Carousel.Item>
                            ))
                            :
                            <span>No events provided</span>
                    }
                </Carousel>
            </Modal.Body>
        </Modal>
    )
}

export default Viewer