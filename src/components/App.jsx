class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoList: [],
      currentVideo: {},
      val: 'cat',
      auto: true
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
        // val: ''
      }); 
    }.bind(this));
  }

  handleKeyPress(event) {
    var key = event.target.value;
    this.setState({
      val: key
    });

    _.debounce(this.search.bind(this), 500)();
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

  toggleAuto() {
    this.setState({
      auto: !this.state.auto
    });
  }
  
  render() {
    var style = {background: this.state.auto ? '#b2cfff' : '#fff'};


    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search val= {this.state.val} onClick={this.submitQuery.bind(this)} onChange={this.handleKeyPress.bind(this)}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo} onClick={this.toggleAuto.bind(this)} toggle={this.state.auto} style={style} />
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
