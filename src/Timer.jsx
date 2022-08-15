import React, { useEffect, useState } from "react";
import {
    map,
    of,
    interval,
    timer,
    takeUntil,
    distinctUntilChanged,
    switchMap,
} from "rxjs";

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

const useObservable = (observable, onItemReceived) => {
    useEffect(() => {
        let subscription = observable.subscribe((item) => {
            onItemReceived(item);
        });
        return () => subscription.unsubscribe();
    }, [observable, onItemReceived]);
};

const WORK_SECONDS = 5;

const useTimer = (timerState) => {
    const timerTick$ = of(timerState).pipe(
        map((state) => state === "reset"),
        // gated if value is equal to last value, otherwise return observable of the unique value (compared to last)
        distinctUntilChanged(),
        // https://blog.angular-university.io/rxjs-higher-order-mapping/
        // Observable switching is all about ensuring that the unsubscription logic of unused Observables gets triggered, so that resources can be released!
        // if a new observable start emitting values, unsubscribe from the previous Observable before subscribing to the new observable. Avoid memory leaks.
        switchMap(isResetState => isResetState ? of(WORK_SECONDS))
    );
};

const timerState = ["reset", "running", "paused"];

const Timer = () => {
    const [timerState, setTimerState] = useState("reset");
    // const [secRemaining, setSecRemaining] = useState(WORK_WINDOW_SEC);
    // useTimer(() => setSecRemaining(secRemaining - 1));
    return (
        <>
            <h1>Pomodoro Timer</h1>
            <p>Time remaining: {secRemaining}</p>
            {secRemaining === 0 && <p>Time to rest!</p>}
        </>
    );
};

Timer.defaultProps = {};
Timer.propTypes = {};

export default Timer;
