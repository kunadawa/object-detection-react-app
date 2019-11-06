// TODO - load this as a configuration value
const STREAM_PATH = 'http://localhost:5000/stream'

function register_stream_callback(callback) {
    // TODO will this be created every time this function is called?
    const source = new EventSource(STREAM_PATH)
    source.onmessage = callback
}

export {register_stream_callback};