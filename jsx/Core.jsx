var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;

var GameState = (function(){
  var module = {};

  module.ticks = 0;
  module.tickSpeed = 0;

  return module;
})();

var Player = React.createClass({
    propTypes: function(){
      return {
        tick: React.PropTypes.function,
        ticks: 0
      }
    },

    // componentDidMount: function(){
    //     this.timer = setInterval(this.tick, this.state.tickSpeed);
    // },
    //
    // componentWillUnmount: function(){
    //     clearInterval(this.timer);
    // },

    render: function() {
        return <Button onClick={this.props.tick}>This example was started <b>{this.props.ticks} ticks</b> ago.</Button>;
    }
});

var Monster = React.createClass({
  render: function(){
    return <div className="ui panel">
              Monster
                <ProgressBar now={this.props.ticks} label='%(percent)s%'></ProgressBar>
            </div>;
  }
});

var Game = React.createClass({

  propTypes: function(){
    return {
      initialTicks: React.PropTypes.int,
      initialTickSpeed: React.PropTypes.int,
      tick: React.PropTypes.function
    }
  },

  getDefaultProps: function(){
      return {
        initialTicks: 0,
        initialTickSpeed: 1000
      };
  },

  tick: function(){
      this.setState({ticks: this.state.ticks + 1});
  },

  getInitialState: function(){
      return {
          ticks: this.props.initialTicks,
          tickSpeed: this.props.initialTickSpeed
        };
  },

  render: function(){
    return <Panel>
            <Monster ticks={this.state.ticks}></Monster>
            <Player ticks={this.state.ticks} tick={this.tick}></Player>
          </Panel>;
  }
});
