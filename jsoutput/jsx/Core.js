"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;

var GameState = function GameState() {
  _classCallCheck(this, GameState);

  this.ticks = 0;
  this.tickSpeed = 0;

  this.monsters = [{ name: "Rat", health: 20, key: 1 }];
};

var Player = React.createClass({
  displayName: "Player",

  propTypes: function propTypes() {
    return {
      tick: React.PropTypes["function"],
      ticks: 0
    };
  },

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
    var _this = this;

    return React.createElement(
      "div",
      { className: "ui panel" },
      this.props.stuff.name,
      React.createElement(ProgressBar, { now: this.props.stuff.health, label: "%(percent)s%" }),
      React.createElement(
        Button,
        { onClick: function () {
            return _this.props.attackMonster(_this.props.index);
          } },
        "Attack"
      )
    );
  }

});

var Game = React.createClass({
  displayName: "Game",

  getDefaultProps: function getDefaultProps() {
    return {
      gameState: new GameState()
    };
  },

  attackMonster: function attackMonster(monsterIndex) {
    this.props.gameState.monsters[0].health -= 1;
    this.setState(this.props.gameState);
  },

  getInitialState: function getInitialState() {
    return this.props.gameState;
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      Panel,
      null,
      this.state.monsters.map(function (m, i) {
        return React.createElement(Monster, { attackMonster: _this2.attackMonster, stuff: m, key: m.key, index: i });
      })
    );
  }
});
//# sourceMappingURL=C:\Users\Abayai\Desktop\Git Development\jsx\Core.js.map