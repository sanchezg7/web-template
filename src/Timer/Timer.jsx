import React, { useRef, useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import cx from "classnames";
import {
    map,
    of,
    distinctUntilChanged,
    switchMap,
    animationFrameScheduler,
    repeat,
    withLatestFrom,
    take,
    filter,
    scan,
    scheduled,
} from "rxjs";
import {
    pluckFirst,
    useObservableState,
    useObservable,
} from "observable-hooks";
import { RUNNING, RESET, PAUSED } from "./timer.js";
import Countdown from "../Countdown/Countdown";
import reset from "../reset.svg";

// onTimerIncrement (extend window)
// onTimerWarning (e.g. 5 min left)

const DEFAULT_WORK_SECONDS = 25 * 60;

const Timer = ({
    seconds = DEFAULT_WORK_SECONDS,
    onTimerLapsed,
    onTimerReset,
    statusSprite,
}) => {
    const [timerState, setTimerState] = useState(RESET);
    // pass timerState as a dependency array. When it changes it will emit a new item on the observable.
    const timerState$ = useObservable(pluckFirst, [timerState]);
    // subscribe to the change in the timerState observable
    const timerTick$ = useObservable(() =>
        timerState$.pipe(
            map((timerState) => timerState === RESET),
            // true or false. Only when toggled.
            distinctUntilChanged(),
            switchMap((isResetState) =>
                isResetState
                    ? of(seconds)
                    : scheduled(
                          [animationFrameScheduler.now()],
                          animationFrameScheduler
                      ).pipe(
                          // Yield an observable that resubscribes to the source stream when the source stream completes. Will provide the same value (startTime)
                          repeat(),
                          // yield the seconds elapsed "~~" gets the integer portion of it
                          map(
                              (startTime) => ~~((Date.now() - startTime) / 1000)
                          ),
                          // drop the emission if unchanged since the last one, otherwise yield the next reducer in the pipeline
                          distinctUntilChanged(),
                          // bring the latest timerState emission in scope to leverage logic in the pipeline for to implement pause logic
                          withLatestFrom(timerState$),
                          // continue only if the timer is running, otherwise drop the emission
                          filter(([, timerState]) => timerState === RUNNING),
                          // Continue to take up to the amount of seconds specified. Otherwise, mark the Observable as complete.
                          take(seconds),
                          // Based on the seed, apply a reducer function to yield a value
                          scan((timeLeft) => timeLeft - 1, seconds)
                      )
            )
        )
    );
    const handleOnTimerLapsed = () => {
        setTimerState(RESET);
        onTimerLapsed(timerState);
    };
    const secRemaining = useObservableState(timerTick$, seconds);
    useEffect(() => {
        if (secRemaining === 0) {
            handleOnTimerLapsed();
        }
    }, [secRemaining]);
    const convenienceRef = useRef();
    useEffect(() => {
        convenienceRef.current.focus();
    }, []);

    const toggleTimer = () => {
        if (timerState === RESET || timerState === PAUSED) {
            setTimerState(RUNNING);
            return;
        }

        setTimerState(PAUSED);
    };
    return (
        <>
            <div className="flex flex-col items-center">
                {statusSprite({ "animate-ping": timerState === PAUSED })}
                <Countdown className="py-6" seconds={secRemaining} />
                <div className="grid grid-cols-2 gap-4">
                    <button
                        ref={convenienceRef}
                        className={cx({
                            "btn btn-outline btn-success":
                                timerState === RESET || timerState === PAUSED,
                            "btn btn-outline btn-info": timerState === RUNNING,
                        })}
                        onClick={toggleTimer}
                    >
                        {timerState === RESET || timerState === PAUSED
                            ? "start"
                            : "pause"}
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            setTimerState(RESET);
                            onTimerReset();
                        }}
                    >
                        <img src={reset} alt="reset timer" />
                    </button>
                </div>
            </div>
        </>
    );
};

Timer.defaultProps = {};
Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
    onTimerLapsed: PropTypes.func,
    onTimerReset: PropTypes.func,
    statusSprite: PropTypes.func,
};

export default Timer;
