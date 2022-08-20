import React, { useEffect, useState } from "react";
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

// onTimerIncrement (extend window)
// onTimerWarning (e.g. 5 min left)

const WORK_SECONDS = 25 * 60;

const Timer = () => {
    const [timerState, setTimerState] = useState(RESET);
    const handleStartTimer = () => {
        setTimerState(RUNNING);
    };
    const handlePauseTimer = () => {
        setTimerState(PAUSED);
    };
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
                    ? of(WORK_SECONDS)
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
                          take(WORK_SECONDS),
                          // Based on the seed, apply a reducer function to yield a value
                          scan((timeLeft) => timeLeft - 1, WORK_SECONDS)
                      )
            )
        )
    );
    const secRemaining = useObservableState(timerTick$, WORK_SECONDS);
    useEffect(() => {
        if (secRemaining === 0) {
            setTimerState(RESET);
        }
    }, [secRemaining]);
    return (
        <>
            <div className="flex flex-col items-center">
                <h1>pomodoro.</h1>
                <Countdown className="content-center" seconds={secRemaining} />
                {(timerState === RESET || timerState === PAUSED) && (
                    <button
                        className="btn btn-outline btn-success"
                        onClick={handleStartTimer}
                    >
                        start
                    </button>
                )}
                {timerState === RUNNING && (
                    <button
                        className="btn btn-outline btn-info"
                        onClick={handlePauseTimer}
                    >
                        pause
                    </button>
                )}
            </div>
        </>
    );
};

Timer.defaultProps = {};
Timer.propTypes = {};

export default Timer;
