class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoList: [],
      currentVideo: {},
      val: 'cat'
    };
  }

  componentDidMount() {
    this.search();
  }
    
  search() {
    var options = {
      max: 5, 
      query: this.state.val,
      key: window.YOUTUBE_API_KEY
    };

    this.props.searchYouTube(options, function(videos) {
      this.setState({
        videoList: videos,
        currentVideo: videos[0],
        val: ''
      }); 
    }.bind(this));
  }

  handleKeyPress(event) {
    var key = event.key;
    this.setState({
      val: this.state.val + key
    });
  } 
  
  handleClick(video) {
    this.setState({
      currentVideo: video,
    });
  }

  submitQuery() {
    this.search();
    this.setState({
      val: ''
    });
  }
  
  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search val= {this.state.val} onClick={this.submitQuery.bind(this)} onChange={this.handleKeyPress.bind(this)}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videoList} onClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
