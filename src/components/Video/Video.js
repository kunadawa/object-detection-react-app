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
    fetch ("http//:localhost:50644").then(response => {
      const mediaSource = event.target
      const videoSourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"')
      const reader = response.body.getReader();
      function push() {
        return reader.read().then(({done, value}) => {
          if (done) {
            return;
          }
          videoSourceBuffer.appendBuffer(value)
        }).then(push)
      }
      push();
    })
  }
}

export default Video
