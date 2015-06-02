var GameState = (function(){
  var module = {};

  module.ticks = 0;
  module.tickSpeed = 0;

  return module;
})();

var Player = React.createClass({
    propTypes: function(){
      return {
        initialTicks: React.PropTypes.int,
        initialTickSpeed: React.PropTypes.int
      }
    },

    getDefaultProps: function(){
        return {
          initialTicks: 0,
          initialTickSpeed: 1000
        };
    },

    getInitialState: function(){
        return {
            ticks: this.props.initialTicks,
            tickSpeed: this.props.initialTickSpeed
          };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, this.state.tickSpeed);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        //this.setState({ticks: this.state.ticks + 1});
    },

    clickHandle:function(){
      this.setState({ticks: this.state.ticks + 1});
    },

    render: function() {
        var clickHandle = this.clickHandle;
        return <div className="ui button" onClick={clickHandle}>
          This example was started <b>{this.state.ticks} ticks</b> ago.
        </div>;
    }
});

var ProgressBar = React.createClass({
  render: function(){
    return <div className="ui grid">
      <div className="eight wide column">
        <div className="label">Heath</div>
      </div>
      <div className="eight wide column">
        <div className="ui small indicating progress" data-value="50" data-total="200">
          <div className="bar">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
    ;
  }
});

var Monster = React.createClass({
  render: function(){
    return <div className="ui panel">
              Monster
              <div className="detail">
              <ProgressBar></ProgressBar>
            </div>
          </div>;
  }
});

var Game = React.createClass({
  render: function(){
    return <div><Player></Player><Monster></Monster></div>;
  }
});
