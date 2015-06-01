"use strict";

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

var Monster = React.createClass({
    displayName: "Monster",

    render: function render() {
        return React.createElement(
            "div",
            { className: "ui label" },
            "Monster",
            React.createElement(
                "div",
                { className: "detail" },
                React.createElement(
                    "div",
                    { className: "ui indicating progress", "data-value": "1", "data-total": "20" },
                    React.createElement(
                        "div",
                        { className: "bar" },
                        React.createElement("div", { className: "progress" })
                    ),
                    React.createElement(
                        "div",
                        { className: "label" },
                        "Heath"
                    )
                )
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
            React.createElement(Player, null)
        );
    }
});

//this.setState({ticks: this.state.ticks + 1});