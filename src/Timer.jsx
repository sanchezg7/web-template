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

// onTimerElapsed (onWorkTimer reached zero)
// onTimerDecrement
// onTimerStart (restart as well)
// onTimerIncrement (extend window)
// onTimerWarning (e.g. 5 min left)
// onPauseTimer
// onResumeTimer

// Work timer, rest timer

// interval 1000s
//

const WORK_SECONDS = 5 + 1;

const timerState = ["reset", "running", "paused"];

const Timer = () => {
    const [timerState] = useState("running");
    // const [secRemaining, setSecRemaining] = useState(WORK_WINDOW_SEC);
    // useTimer(() => setSecRemaining(secRemaining - 1));
    // pass timerState as a dependency array. When it changes it will emit a new item on the observable.
    const timerState$ = useObservable(pluckFirst, [timerState]);
    // subscribe to the change in the timerState observable
    const timerTick$ = useObservable(() =>
        timerState$.pipe(
            map((timerState) => timerState === "reset"),
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
                          filter(([, timerState]) => timerState === "running"),
                          // Continue to take up to the amount of seconds specified. Otherwise, mark the Observable as complete.
                          take(WORK_SECONDS),
                          // Based on the seed, apply a reducer function to yield a value
                          scan((timeLeft) => timeLeft - 1, WORK_SECONDS)
                      )
            )
        )
    );
    const secRemaining = useObservableState(timerTick$, WORK_SECONDS);
    return (
        <>
            <h1>Pomodoro Timer</h1>
            <p>Time remaining: {secRemaining}</p>
            {secRemaining === 0 && <p>Time to rest!</p>}

            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": 15 }}></span>
                    </span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        {/*<span style="--value:10;"></span>*/}
                    </span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        {/*<span style="--value:24;"></span>*/}
                    </span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        {/*<span style="--value:44;"></span>*/}
                    </span>
                    sec
                </div>
            </div>
        </>
    );
};

Timer.defaultProps = {};
Timer.propTypes = {};

export default Timer;
