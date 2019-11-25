import React from "react";
import {Carousel, Modal} from 'react-bootstrap'

function Viewer(props) {
    return (
        <Modal>
            <Carousel>
                {
                    props.events
                        ?
                        props.events.map(event => (
                            <Carousel.Item>
                                <img src={`${props.streamHost}${event.stringMap['frame_path']}`}/>
                            </Carousel.Item>
                        ))
                        :
                        <span>No events provided</span>
                }
            </Carousel>
        </Modal>
    )
}

export default Viewer