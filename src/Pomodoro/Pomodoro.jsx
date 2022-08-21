import React, { useMemo, useState } from "react";
import cx from "classnames";
import Timer from "../Timer/Timer";
import { WORK, REST, WORK_SECONDS, REST_SECONDS } from "./pomodoro";

const Pomodoro = () => {
    const [intervalType, setIntervalType] = useState(WORK);
    const seconds = useMemo(() => {
        if (intervalType === WORK) {
            return WORK_SECONDS;
        }
        return REST_SECONDS;
    }, [intervalType]);
    const onTimerLapsed = () => {
        if (intervalType === WORK) {
            setIntervalType(REST);
            return;
        }

        setIntervalType(WORK);
        return;
    };
    return (
        <div className="flex flex-col items-center">
            <h1>pomodoro.</h1>
            <Timer
                seconds={seconds}
                onTimerLapsed={onTimerLapsed}
                statusSprite={(className) => {
                    return (
                        <span
                            className={cx(
                                className,
                                "inline-flex rounded-full h-3 w-3 bg-sky-500"
                            )}
                        ></span>
                    );
                }}
            />
        </div>
    );
};

Pomodoro.defaultProps = {};
Pomodoro.propTypes = {};

export default Pomodoro;
