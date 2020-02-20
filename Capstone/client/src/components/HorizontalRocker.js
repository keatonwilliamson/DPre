import React, { useEffect } from 'react';

class HorizontalRocker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            on: props.on
        };
        this.colors = {
            orange: {
                on: {
                    leftFlat: "rgb(204, 75, 0)",
                    rightFlat: "rgb(173, 64, 0)"
                },
                off: {
                    leftFlat: "rgb(173, 64, 0)",
                    rightFlat: "rgb(122, 45, 0)"
                },
                leftRoundGradient: "linear-gradient(to right, rgb(74, 31, 7), rgb(158, 58, 0))",
                rightRoundGradient: "linear-gradient(to right, rgb(204, 75, 0), rgb(153, 56, 0))",
                rightFlatBorderLeft: "1px solid rgb(158, 58, 0)",
                rightFlatBorderRight: "1px solid rgb(204, 75, 0)",
                leftFlatBorderLeft: "1px solid rgb(204, 75, 0)",
            },
            black: {
                on: {
                    leftFlat: "rgb(38, 38, 38)",
                    rightFlat: "black"
                },
                off: {
                    leftFlat: "black",
                    rightFlat: (this.props.power ? "black" : "rgb(38, 38, 38)"),
                },
                leftRoundGradient: "linear-gradient(to right, black, rgb(45, 45, 45))",
                rightRoundGradient: `linear-gradient(to right, rgb(45, 45, 45), ${(this.props.power ? "rgb(20, 20, 20)" : "black")})`,
                rightFlatBorderLeft: "1px solid rgb(73, 73, 73)",
                rightFlatBorderRight: "1px solid rgb(73, 73, 73)",
                leftFlatBorderLeft: "1px solid rgb(73, 73, 73)",
            },
            blue: {
                on: {
                    leftFlat: "rgb(97, 130, 128)",
                    rightFlat: "rgb(85, 119, 117)"
                },
                off: {
                    leftFlat: "rgb(97, 130, 128)",
                    rightFlat: "rgb(58, 80, 79)"
                },
                leftRoundGradient: "linear-gradient(to right, rgb(18, 21, 20), rgb(61, 90, 88))",
                rightRoundGradient: "linear-gradient(to right, rgb(104, 144, 142), rgb(71, 97, 96))",
                rightFlatBorderLeft: "1px solid rgb(78, 105, 104)",
                rightFlatBorderRight: "1px solid rgb(88, 125, 124)",
                leftFlatBorderLeft: "1px solid rgb(85, 119, 117)",
            },
        }
    }

    toggleRocker = () => {
        this.props.onChange(this.props.parameter, !this.state.on);
        this.setState({ on: !this.state.on });
    }

    dcpy = o => {
        return JSON.parse(JSON.stringify(o));
    };

    componentWillReceiveProps({ on, reloadControls }) {
        if ((reloadControls != this.props.reloadControls) || (on != this.props.on && this.state.loaded === false)) {
            this.setState({ ...this.state, on: on, loaded: true })
        }
    }

    render() {
        // rounds
        let leftRoundStyle = this.dcpy({
            height: "33px",
            width: "29px",
            backgroundImage: `${this.colors[this.props.color].leftRoundGradient}`,
            left: `0px`,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        let rightRoundStyle = this.dcpy({
            height: "33px",
            width: "29px",
            backgroundImage: `${this.colors[this.props.color].rightRoundGradient}`,
            left: `61px`,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        // flats
        let leftFlatStyle = this.dcpy({
            height: "33px",
            width: `${this.state.on ? 24 : 31}px`,
            backgroundColor: `${this.state.on ? this.colors[this.props.color].on.leftFlat : this.colors[this.props.color].off.leftFlat}`,
            left: `${this.state.on ? 29 : 6}px`,
            borderLeft: this.colors[this.props.color].leftFlatBorderLeft,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        let rightFlatStyle = this.dcpy({
            height: "33px",
            width: `${this.state.on ? 30 : 24}px`,
            backgroundColor: `${this.state.on ? this.colors[this.props.color].on.rightFlat : this.colors[this.props.color].off.rightFlat}`,
            left: `${this.state.on ? 53 : 37}px`,
            position: "absolute",
            borderLeft: this.colors[this.props.color].rightFlatBorderLeft,
            borderRight: this.colors[this.props.color].rightFlatBorderRight,
            transition: "all 0.3s ease-out"
        });

        return (
            <div className={`horizontal-rocker-box ${this.props.uniqueClass}`} onMouseDown={this.toggleRocker}>
                <div className="horizontal-rocker-left-round-facade" style={leftRoundStyle}></div>
                <div className="horizontal-rocker-right-round-facade" style={rightRoundStyle}></div>
                <div className="horizontal-rocker-left-flat-facade" style={leftFlatStyle}></div>
                <div className="horizontal-rocker-right-flat-facade" style={rightFlatStyle}></div>
            </div>
        );
    }
}

export default HorizontalRocker;