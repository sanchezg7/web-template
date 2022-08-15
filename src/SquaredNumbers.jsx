import React, { useEffect, useState } from "react";
import { from } from "rxjs";
import { map, filter, delay, mergeMap } from "rxjs/operators";

let numbersObservable = from([1, 2, 3, 4, 5]);

let squareNumbers = numbersObservable.pipe(
    // do something to this piped result
    map((val) => val * val)
);

const SquareNumbers = () => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        // To consume an observable, subscribe.
        let subscription = squareNumbers.subscribe((result) => {
            setCurrentNumber(result);
            console.log(result);
        });
        return () => subscription.unsubscribe();
    }, []);
    return (
        <div className="App">
            <h1>RxJS Counter</h1>
            <p>Current number is: {currentNumber}</p>
        </div>
    );
};

export default SquareNumbers;
