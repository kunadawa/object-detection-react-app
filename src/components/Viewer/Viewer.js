import React from "react";
import {Carousel, Modal} from 'react-bootstrap'

function Viewer(props) {
    return (
        <Modal show={props.show} onHide={() => props.hide()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.events ? `${props.events[0].instanceName} / ${props.events[0].source}` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {
                        props.events
                            ?
                            props.events.map(event => (
                                <Carousel.Item key={`${event.stringMap['frame_path']}`}>
                                    <img
                                        src={`${props.streamHost}${event.stringMap['frame_path']}`}
                                        className='d-block mx-auto'
                                    />
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