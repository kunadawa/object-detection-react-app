import React, {Component} from 'react'

class Video extends Component {
  state = {
    videoUrl:'',
  }

  render() {
    return <div>
            <video src={this.state.videoUrl} autoPlay/>
          </div>
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
    const mediaSource = event.target
    if (! mediaSource.sourceBuffers.length) {
      const videoSourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"')
      this.fetchVideo(videoSourceBuffer);
    }
    // videoSourceBuffer.addEventListener('updateend', (event) => {
    //   const buffer = event.target;
    //   this.fetchVideo(buffer);
    // })
  }

  fetchVideo = (videoSourceBuffer) => {
    fetch ("http://localhost:50644")
      .then(response => {
        const reader = response.body.getReader();
        function push() {
          return reader.read().then(({done, value}) => {
            if (done) {
              return;
            }
            //if (!videoSourceBuffer.updating) {
              //if (this.state.videoError !== '') {
                //console.log('video error: ', this.state.videoError)
              //}
              try {
                videoSourceBuffer.appendBuffer(value)
              } catch(error) {
                console.error(error)
              }
            //}
          }).then(push)
        }
        push();
    }).catch(error => {
      console.error('fetch error', error)
    })
  }
}

export default Video
