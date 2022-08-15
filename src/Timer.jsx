import React, { useEffect } from "react";
import { interval, timer, takeUntil } from "rxjs";

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

const onOneSecTick = interval(1000);
const now = new Date();
const nextMinute = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds() + 7
);

const timeCounterObservable = onOneSecTick.pipe(takeUntil(timer(nextMinute)));

const useObservable = (observable, onItemReceived) => {
    useEffect(() => {
        let subscription = observable.subscribe((item) => {
            onItemReceived(item);
        });
        return () => subscription.unsubscribe();
    }, [observable, onItemReceived]);
};

const Timer = () => {
    useObservable(timeCounterObservable, (item) => console.log(item));
    return <div>I am timer</div>;
};

Timer.defaultProps = {};
Timer.propTypes = {};

export default Timer;
