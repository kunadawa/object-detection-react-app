import React, {Component} from 'react'

class Video extends Component {
  state = {
    videoUrl:''
  }

  render() {
    return <video src={this.state.videoUrl}/>
  }

  componentDidMount = () => {

    //https://medium.com/canal-tech/how-video-streaming-works-on-the-web-an-introduction-7919739f7e1
    const mediaSource = new MediaSource()
    const url = URL.createObjectURL(mediaSource)
    mediaSource.addEventListener('sourceopen', this.sourceOpen)
    this.setState({videoUrl:url});
  }

  sourceOpen = (event) => {
    // based on code samples:
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/readyState
    // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs
    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader
    // https://developers.google.com/web/fundamentals/media/mse/basics
    // https://stackoverflow.com/questions/20042087/could-not-append-segments-by-media-source-api-get-invalidstateerror-an-attem
    fetch ("http://localhost:50644").then(response => {
      const mediaSource = event.target
      const queue = []
      const videoSourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"')
      videoSourceBuffer.addEventListener('updateend', (event) => {
        if (queue.length) {
          videoSourceBuffer.appendBuffer(queue.shift())
        }
      })
      const reader = response.body.getReader();
      let firstAppend = true;
      function push() {
        return reader.read().then(({done, value}) => {
          if (done) {
            return;
          }
          if (firstAppend) {
            videoSourceBuffer.appendBuffer(value)
            firstAppend = false
          } else {
            queue.push(value)
          }
        }).then(push)
      }
      push();
    })
  }
}

export default Video
