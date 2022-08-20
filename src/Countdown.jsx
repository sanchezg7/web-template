import React from "react";
import * as PropTypes from "prop-types";

const Countdown = ({ seconds }) => {
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;
    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": mins }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": secs }}></span>
                </span>
                sec
            </div>
        </div>
    );
};

Countdown.defaultProps = {};
Countdown.propTypes = {
    seconds: PropTypes.required,
};

export default Countdown;
