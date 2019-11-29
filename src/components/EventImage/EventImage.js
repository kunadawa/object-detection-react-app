import React from "react";
import {STREAM_HOST} from "../../api/stream-api";
import {reshapeDetectionBox, pixelDimsForBoundingBox} from "../../utils/event-utils";
import './EventImage.css';

function EventImage(props) {
    const {event} = props;
    return (
        <div>
            <img 
                width={event.floatMap['frame_height']} 
                height={event.floatMap['frame_width']}
                src={`${STREAM_HOST}${event.stringMap['frame_path']}`}
                alt={`${event.detectionClasses.map(clazz => event.categoryIndex[clazz])}`}
            />
            {reshapeDetectionBox(event.detectionBoxes.numbers, event.detectionBoxes.shape).map((box, index) => {
                const position = pixelDimsForBoundingBox(box, event.floatMap['frame_height'], event.floatMap['frame_width'])
                return (
                    <div
                        className='box'
                        key={box.join()}
                        style={{position:'absolute', top:position.top, left:position.left, width:position.width, height:position.height}}>

                        <span className='label'>
                            {`${event.categoryIndex[event.detectionClasses[index]]} (${Math.round(event.detectionScores[index] * 100)}%)`}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}

export default EventImage;