var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;

class GameState {
  constructor() {
    this.ticks = 0;
    this.tickSpeed = 0;

    this.monsters = [ { name: "Rat", health: 20, key: 1 } ];
  }
}

var Player = React.createClass({
    propTypes: function(){
      return {
        tick: React.PropTypes.function,
        ticks: 0
      }
    },

    render: function() {
        return <Button onClick={this.props.tick}>This example was started <b>{this.props.ticks} ticks</b> ago.</Button>;
    }
});

var Monster = React.createClass({
  render: function(){
    return <div className="ui panel">
              {this.props.stuff.name}
                <ProgressBar now={this.props.stuff.health} label='%(percent)s%' ></ProgressBar>
                <Button onClick={ () => this.props.attackMonster(this.props.index)} >Attack</Button>
            </div>;
  }

});

var Game = React.createClass({

  getDefaultProps: function(){
      return {
        gameState: new GameState()
      };
  },

  attackMonster: function(monsterIndex){
      this.props.gameState.monsters[0].health -= 1;
      this.setState(this.props.gameState);
  },

  getInitialState: function(){
      return this.props.gameState;
  },

  render: function(){
    return <Panel>
            {this.state.monsters.map( (m, i) => <Monster attackMonster={this.attackMonster} stuff={m} key={m.key} index={i}></Monster>)}
          </Panel>;
  }
});
