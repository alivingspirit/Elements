"use strict";
var ProgressBar = ReactBootstrap.ProgressBar;

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
      initialTicks: React.PropTypes.int,
      initialTickSpeed: React.PropTypes.int
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialTicks: 0,
      initialTickSpeed: 1000
    };
  },

  getInitialState: function getInitialState() {
    return {
      ticks: this.props.initialTicks,
      tickSpeed: this.props.initialTickSpeed
    };
  },

  componentDidMount: function componentDidMount() {
    this.timer = setInterval(this.tick, this.state.tickSpeed);
  },

  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.timer);
  },

  tick: function tick() {},

  clickHandle: function clickHandle() {
    this.setState({ ticks: this.state.ticks + 1 });
  },

  render: function render() {
    var clickHandle = this.clickHandle;
    return React.createElement(
      "div",
      { className: "ui button", onClick: clickHandle },
      "This example was started ",
      React.createElement(
        "b",
        null,
        this.state.ticks,
        " ticks"
      ),
      " ago."
    );
  }
});

var ProgressBar = React.createClass({
  displayName: "ProgressBar",

  render: function render() {
    return React.createElement(
      "div",
      { className: "ui grid" },
      React.createElement(
        "div",
        { className: "eight wide column" },
        React.createElement(
          "div",
          { className: "label" },
          "Heath"
        )
      ),
      React.createElement(
        "div",
        { className: "eight wide column" },
        React.createElement(
          "div",
          { className: "ui small indicating progress", "data-value": "50", "data-total": "200" },
          React.createElement(
            "div",
            { className: "bar" },
            React.createElement("div", { className: "progress" })
          )
        )
      )
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
      React.createElement(
        "div",
        { className: "detail" },
        React.createElement(ProgressBar, null)
      )
    );
  }
});

var Game = React.createClass({
  displayName: "Game",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Player, null),
      React.createElement(Monster, null)
    );
  }
});

//this.setState({ticks: this.state.ticks + 1});
