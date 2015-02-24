/** @jsx React.DOM */

var Element = React.createClass({

    propTypes: function(){
      return {
        initialTicks: React.PropTypes.int,
        initialTickSpeed: React.PropTypes.int
      }
    },

    getDefaultProps: function(){
        return {
          initialTicks: 0,
          initialTickSpeed: 50
        };
    },

    getInitialState: function(){
        return {
            ticks: this.props.initialTicks,
            tickSpeed: this.props.initialTickSpeed
          };
    },

    componentDidMount: function(){
      console.log(this.state);
        this.timer = setInterval(this.tick, this.state.tickSpeed);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({ticks: this.state.ticks + 1});
    },

    render: function() {
        return <p>This example was started <b>{this.state.ticks} ticks</b> ago.</p>;
    }
});
