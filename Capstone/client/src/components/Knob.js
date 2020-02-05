import React from 'react';

class Knob extends React.Component {
    constructor(props) {
        super(props);
        this.fullAngle = props.degrees;
        this.startAngle = (360 - props.degrees) / 2;
        this.endAngle = this.startAngle + props.degrees;
        // this.currentDeg = Math.floor(
        //     this.convertRange(
        //         props.min,
        //         props.max,
        //         this.startAngle,
        //         this.endAngle,
        //         props.value
        //     )
        // );
        this.currentDeg = props.value;

        this.state = {
            deg: this.currentDeg,
            clicked: false
        };
    }

    startDrag = e => {
        e.preventDefault();
        const knob = e.target.getBoundingClientRect();
        const pts = {
            x: knob.left + knob.width / 2,
            y: knob.top + knob.height / 2
        };
        this.setState({ clicked: true });
        const moveHandler = e => {
            this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
            if (this.currentDeg === this.startAngle) this.currentDeg--;
            let newValue = Math.floor(
                this.convertRange(
                    this.startAngle,
                    this.endAngle,
                    this.props.min,
                    this.props.max,
                    this.currentDeg
                )
            );
            if(this.props.masterTune) newValue = ((newValue - 5)/2)
            this.setState({ deg: this.currentDeg });
            this.props.onChange(this.props.parameter, newValue, Math.floor(this.currentDeg));
        };
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", e => {
            this.setState({ clicked: false });
            document.removeEventListener("mousemove", moveHandler);
        });
    };


    getDeg = (cX, cY, pts) => {
        const x = cX - pts.x;
        const y = cY - pts.y;
        let deg = Math.atan(y / x) * 180 / Math.PI;
        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }
        let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
        return finalDeg;
    };


    // ((current degrees - smallest angle) / (biggest angle - smallest angle)) * (biggest range - smallest range) + smallestRange
    convertRange = (sA, bA, sR, bR, cD) => {
        return ((cD - sA) / (bA - sA)) * (bR - sR) + sR;
    }

    dcpy = o => {
        return JSON.parse(JSON.stringify(o));
    };

    render() {
        let iStyle = this.dcpy({ transform: "rotate(" + this.state.deg + "deg)" });
        let knobValueStyle = this.dcpy({visibility: this.state.clicked ? "visible" : "hidden"});
        if (this.props.masterTune) {
            knobValueStyle.marginTop = "12px";
            knobValueStyle.fontSize = "24px"
        }
        // if (this.state.glow) iStyle.filter = "drop-shadow(-0px -0px 3px white"
        // let oStyle = { ...iStyle }
        // delete oStyle.transform;
        // oStyle.filter = "drop-shadow(-0px -0px 1px white"
        // delete iStyle.filter;
        let metalStyle = this.dcpy({ transform: "rotate(" + -this.state.deg + "deg)" });
        return (
            <div className={`knob outer ${this.props.uniqueClass}`} onMouseDown={this.startDrag}>
                <div className="knob inner" style={iStyle}>
                    <div className="metal" style={metalStyle}>
                        <p className="knob-value" style={knobValueStyle}>{this.props.currentValue}</p>
                    </div>
                    <div className="grip" />
                    <div className="grip outer-grip" />
                </div>
            </div>
        );
    }
}

export default Knob;