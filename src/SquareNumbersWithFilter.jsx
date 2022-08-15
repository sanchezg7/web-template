import React, { useEffect, useState } from "react";
import { from } from "rxjs";
import { map, filter, delay, mergeMap } from "rxjs/operators";

let numbersObservable = from([1, 2, 3, 4, 5]);

let squareNumbers = numbersObservable
    // pipe this observable into other operators that do stuff to the items in the pipe
    .pipe(
        // only items meeting criteria can continue in the pipe
        filter((val) => val > 2),
        // add a projection to the item in the pipe
        map((val) => val * val)
    );

const SquareNumbersWithFilter = () => {
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

SquareNumbersWithFilter.defaultProps = {};
SquareNumbersWithFilter.propTypes = {};

export default SquareNumbersWithFilter;
