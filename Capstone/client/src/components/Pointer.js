import React from 'react';

class Pointer extends React.Component {
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
        this.rangeValues = ["LO", "32'", "16'", "8'", "4'", "2'",]
        this.currentDeg = props.initialDegreeValue;
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
            let newValue = Math.max(Math.floor(this.convertRange(
                this.startAngle,
                this.endAngle,
                this.props.min,
                this.props.max,
                this.currentDeg
            )), 0);
            this.setState({ deg: (newValue * 30 + 105) });
            this.props.onChange(this.props.parameter, this.rangeValues[newValue], (newValue * 30 + 105));
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
        let knobValueStyle = this.dcpy({ visibility: this.state.clicked ? "visible" : "hidden" });
        let metalStyle = this.dcpy({ transform: "rotate(" + -this.state.deg + "deg)" });
        return (
            <>
                <div className={`pointer outer ${this.props.uniqueClass}`} onMouseDown={this.startDrag}>
                    <div className="pointer inner" style={iStyle}>
                        <div className="pointer-metal" style={metalStyle}>
                            <p className="pointer-value" style={knobValueStyle}>{this.props.currentValue}</p>
                        </div>
                        <div className="grip" />
                    </div>
                </div>

            </>
        );
    }
}

export default Pointer;