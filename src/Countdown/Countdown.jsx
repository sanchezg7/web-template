import React from "react";
import * as PropTypes from "prop-types";
import cx from "classnames";

const Countdown = ({ seconds, className }) => {
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;
    return (
        <div
            className={cx(
                className,
                "grid grid-flow-col gap-5 text-center auto-cols-max"
            )}
        >
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span data-testid="minutes-left" aria-description={`${mins} minutes left`} style={{"--value": mins}}/>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span data-testid="seconds-left" style={{ "--value": secs }} />
                </span>
                sec
            </div>
        </div>
    );
};

Countdown.defaultProps = {
    className: "",
};
Countdown.propTypes = {
    seconds: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default Countdown;
