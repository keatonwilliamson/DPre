import React from 'react';

class HorizontalRocker extends React.Component {
    constructor(props) {
        super(props);
        // this.fullAngle = props.degrees;
        // this.startAngle = (360 - props.degrees) / 2;
        // this.endAngle = this.startAngle + props.degrees;
        // this.currentDeg = Math.floor(
        //     this.convertRange(
        //         props.min,
        //         props.max,
        //         this.startAngle,
        //         this.endAngle,
        //         props.value
        //     )
        // );

        this.state = {
            on: false
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
                rightFlatBorderRight: "1px solid rgb(204, 75, 0)"
            }
        }
    }

    toggleRocker = () => {
        this.props.onChange(this.props.parameter, !this.state.on);
        this.setState({ on: !this.state.on });
    }

    // startDrag = e => {
    //     e.preventDefault();
    //     const knob = e.target.getBoundingClientRect();
    //     const pts = {
    //         x: knob.left + knob.width / 2,
    //         y: knob.top + knob.height / 2
    //     };
    //     this.setState({ glow: true });
    //     const moveHandler = e => {
    //         this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
    //         if (this.currentDeg === this.startAngle) this.currentDeg--;
    //         let newValue = Math.floor(
    //             this.convertRange(
    //                 this.startAngle,
    //                 this.endAngle,
    //                 this.props.min,
    //                 this.props.max,
    //                 this.currentDeg
    //             )
    //         );
    //         this.setState({ deg: this.currentDeg });
    //         this.props.onChange(this.props.parameter, newValue);
    //     };
    //     document.addEventListener("mousemove", moveHandler);
    //     document.addEventListener("mouseup", e => {
    //         this.setState({ glow: false });
    //         document.removeEventListener("mousemove", moveHandler);
    //     });
    // };


    // getDeg = (cX, cY, pts) => {
    //     const x = cX - pts.x;
    //     const y = cY - pts.y;
    //     let deg = Math.atan(y / x) * 180 / Math.PI;
    //     if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    //         deg += 90;
    //     } else {
    //         deg += 270;
    //     }
    //     let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
    //     return finalDeg;
    // };


    // ((current degrees - smallest angle) / (biggest angle - smallest angle)) * (biggest range - smallest range) + smallestRange
    // convertRange = (sA, bA, sR, bR, cD) => {
    //     return ((cD - sA) / (bA - sA)) * (bR - sR) + sR;
    // }

    dcpy = o => {
        return JSON.parse(JSON.stringify(o));
    };

    render() {
        // rounds
        let leftRoundStyle = this.dcpy({
            height: "40px",
            width: "29px",
            backgroundImage: `${this.colors[this.props.color].leftRoundGradient}`,
            left: `0px`,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        let rightRoundStyle = this.dcpy({
            height: "40px",
            width: "29px",
            backgroundImage: `${this.colors[this.props.color].rightRoundGradient}`,
            left: `61px`,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        // flats
        let leftFlatStyle = this.dcpy({
            height: "40px",
            width: `${this.state.on ? 24 : 32}px`,
            backgroundColor: `${this.state.on ? this.colors[this.props.color].on.leftFlat : this.colors[this.props.color].off.leftFlat}`,
            left: `${this.state.on ? 29 : 5}px`,
            position: "absolute",
            transition: "all 0.3s ease-out"
        });
        let rightFlatStyle = this.dcpy({
            height: "40px",
            width: `${this.state.on ? 30 : 24}px`,
            backgroundColor: `${this.state.on ? this.colors[this.props.color].on.rightFlat : this.colors[this.props.color].off.rightFlat}`,
            left: `${this.state.on ? 53 : 37}px`,
            position: "absolute",
            borderLeft: this.colors[this.props.color].rightFlatBorderLeft,
            borderRight: this.colors[this.props.color].rightFlatBorderRight,
            transition: "all 0.3s ease-out"
        });

        // if (this.state.glow) iStyle.filter = "drop-shadow(-0px -0px 5px white"
        // let oStyle = { ...iStyle }
        // delete oStyle.transform;
        // oStyle.filter = "drop-shadow(-0px -0px 1px white"
        // delete iStyle.filter;
        // let metalStyle = this.dcpy({ transform: "rotate(" + -this.state.deg + "deg)" });
        return (
            <div className={`horizontal-rocker-box ${this.props.uniqueClass}`} onMouseDown={this.toggleRocker}>
                <div className="horizontal-rocker-left-round-facade" style={leftRoundStyle}></div>
                <div className="horizontal-rocker-right-round-facade" style={rightRoundStyle}></div>

                <div className="horizontal-rocker-left-flat-facade" style={leftFlatStyle}></div>
                <div className="horizontal-rocker-right-flat-facade" style={rightFlatStyle}></div>

            </div>

            // <div className="knob outer" onMouseDown={this.startDrag}>
            //     <div className="knob inner" style={iStyle}>
            //         <div className="metal" style={metalStyle}>
            //             <p className="knob-value" style={this.state.glow ? {visibility: "visible"} : {visibility: "hidden"}}>{this.props.currentValue}</p>
            //         </div>
            //         <div className="grip" />
            //     </div>
            // </div>
        );
    }
}

export default HorizontalRocker;