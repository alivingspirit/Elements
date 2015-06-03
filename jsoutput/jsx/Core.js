"use strict";

var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;

var GameState = (function () {
  var module = {};

  module.ticks = 0;
  module.tickSpeed = 0;

  return module;
})();

var Player = React.createClass({
  displayName: "Player",

  propTypes: function propTypes() {
    return {
      tick: React.PropTypes["function"],
      ticks: 0
    };
  },

  // componentDidMount: function(){
  //     this.timer = setInterval(this.tick, this.state.tickSpeed);
  // },
  //
  // componentWillUnmount: function(){
  //     clearInterval(this.timer);
  // },

  render: function render() {
    return React.createElement(
      Button,
      { onClick: this.props.tick },
      "This example was started ",
      React.createElement(
        "b",
        null,
        this.props.ticks,
        " ticks"
      ),
      " ago."
    );
  }
});

var Monster = React.createClass({
  displayName: "Monster",

  render: function render() {
    return React.createElement(
      "div",
      { className: "ui panel" },
      "Monster",
      React.createElement(ProgressBar, { now: this.props.ticks, label: "%(percent)s%" })
    );
  }
});

var Game = React.createClass({
  displayName: "Game",

  propTypes: function propTypes() {
    return {
      initialTicks: React.PropTypes.int,
      initialTickSpeed: React.PropTypes.int,
      tick: React.PropTypes["function"]
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialTicks: 0,
      initialTickSpeed: 1000
    };
  },

  tick: function tick() {
    this.setState({ ticks: this.state.ticks + 1 });
  },

  getInitialState: function getInitialState() {
    return {
      ticks: this.props.initialTicks,
      tickSpeed: this.props.initialTickSpeed
    };
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Player, { ticks: this.state.ticks, tick: this.tick }),
      React.createElement(Monster, { ticks: this.state.ticks })
    );
  }
});