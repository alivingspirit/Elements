/** @jsx React.DOM */

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
        this.setState({ticks: this.state.ticks + 1});
    },

    alert:function(){
      alert("Hi");
    },

    render: function() {
        var clickHandle = this.alert;
        return <div
          className="ui button"
          onClick={clickHandle}
          >This example was started <b>{this.state.ticks} ticks</b> ago.
        </div>;
    }
});

var Game = React.createClass({
  render: function(){
    return <Player/>;
  }
});
