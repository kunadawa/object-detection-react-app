const framePath = '/relative/path';
const framePath2 = '/relative/path2';
const instanceName = 'localhost';
const source = "video1";
const streamHost = `http://${instanceName}`;

const event1 = {
    detectionBoxes:{
        numbers:[ 0.3106740713119507, 0.09698716551065445, 0.8693511486053467, 0.29769110679626465]
    },
    stringMap:{frame_path: framePath},
    "detectionScores": [0.9220165014266968],
    "categoryIndex": {"1": "person"},
    "detectionClasses": [1],
};

const event2 = {
    detectionBoxes:{
        numbers:[0.30294761061668396, 0.05614370107650757, 0.8669027090072632, 0.28341057896614075, 0.2969774305820465, 0.3013843894004822, 0.8314237594604492, 0.4671176075935364]
    },
    stringMap:{frame_path: framePath2},
    "detectionScores": [0.9401428699493408, 0.937097430229187],
    "categoryIndex": {"1": "person"},
    "detectionClasses": [1, 1],
};

const eventsWithInstanceAndSource = () => {
    return [event1, event2].map(event => ({...event, instanceName, source}))
}

export {framePath2, framePath, event1, event2, eventsWithInstanceAndSource, instanceName, source, streamHost};