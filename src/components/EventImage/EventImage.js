import React from "react";
import {STREAM_HOST} from "../../api/stream-api";
import {reshapeDetectionBox, pixelDimsForBoundingBox} from "../../utils/event-utils";

function EventImage(props) {
    const {event} = props;
    return (
        <div>
            <img 
                width={event.floatMap['frame_height']} 
                height={event.floatMap['frame_width']}
                src={`${STREAM_HOST}${event.stringMap['frame_path']}`}
            />
            {
                //use bounds.join() as the key}
            }
            {reshapeDetectionBox(event.detectionBoxes.numbers, event.detectionBoxes.shape).map(box => {
                const position = pixelDimsForBoundingBox(box, event.floatMap['frame_height'], event.floatMap['frame_width'])
                return (
                    <div
                        className='box'
                        key={box.join()}
                        style={{position:'absolute', top:position.top, left:position.left, width:position.width, height:position.height}}>

                        <span className='label'></span>
                    </div>
                );
            })}
        </div>
    )
}

export default EventImage;