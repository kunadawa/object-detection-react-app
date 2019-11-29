// TODO - load this as a configuration value
const STREAM_HOST = 'http://localhost:5000';
const STREAM_PATH = `${getStreamURL()}/stream`
const DETECTION_EVENT = 'detection'

function register_stream_callback(callback) {
    // TODO will this be created every time this function is called?
    const source = new EventSource(STREAM_PATH)
    source.addEventListener(DETECTION_EVENT, callback)
}

function getStreamURL() {
    const url = process.env.REACT_APP_STREAM_URL;
    return url ? url : STREAM_HOST;
}

export {register_stream_callback, getStreamURL};