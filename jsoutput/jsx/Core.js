"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;

var GameState = (function () {
  function GameState() {
    _classCallCheck(this, GameState);

    this.nextKey = 1;
    this.ticks = 0;
    this.tickSpeed = 0;

    this.monsters = [];
  }

  _createClass(GameState, [{
    key: "addMonster",
    value: function addMonster() {
      this.monsters.push({ name: "Rat", health: 20, key: this.nextKey });
      this.nextKey++;
    }
  }]);

  return GameState;
})();

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
    var gameState = new GameState();
    gameState.addMonster();
    gameState.addMonster();
    return {
      gameState: gameState
    };
  },

  attackMonster: function attackMonster(monsterIndex) {
    this.props.gameState.monsters[monsterIndex].health -= 1;
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