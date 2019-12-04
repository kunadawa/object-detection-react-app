# Object Detection Event Streaming
This react app displays object detection results from a server. The detection results are sent via HTTP server events.

## Running
- set the URL (host name and port) where the web server events app is running. This will help to avoid CORS errors when running this app on a network.

 `export REACT_APP_STREAM_URL=http://192.168.100.55:5000`

- start the app

 `yarn start`

## Testing
`yarn test`

## Authors
Eric Njogu

## License
MIT
