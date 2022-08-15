import React, { useEffect, useState } from "react";
import {
    BehaviorSubject,
    debounceTime,
    distinctUntilChanged,
    from,
} from "rxjs";
import { filter, mergeMap } from "rxjs/operators";

const getDogsByBreed = async (searchBreed) => {
    const { message: dogBreeds } = await fetch(
        "https://dog.ceo/api/breeds/list"
    ).then((res) => res.json());
    return dogBreeds.filter((breed) => breed.includes(searchBreed));
};

const useObservable = (observable, onItemReceived) => {
    useEffect(() => {
        let subscription = observable.subscribe((item) => {
            onItemReceived(item);
        });
        return () => subscription.unsubscribe();
    }, [observable, onItemReceived]);
};

// producer
let searchTermSubject = new BehaviorSubject("");
// consumer
let searchTermObservable = searchTermSubject.pipe(
    // don't shoot a request of empty term
    filter((val) => val.length > 1),
    // allow the user to finish typing before shooting a network request
    debounceTime(750),
    // avoid making the same search prior to the last if it hasn't changed
    distinctUntilChanged(),
    // make a new observable out of the promise resolved from network call
    mergeMap((val) => from(getDogsByBreed(val)))
);

const DogLookup = () => {
    const [searchResults, setSearchResults] = useState([]);

    useObservable(searchTermObservable, setSearchResults);
    const [searchBreedTerm, setSearchBreedTerm] = useState("");
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchBreedTerm(newSearchTerm);
        // emit on the subject (the producer)
        searchTermSubject.next(newSearchTerm);
    };
    return (
        <div className="App">
            <h1>Search for Dog Breed</h1>
            <input
                type="text"
                placeholder="Dog Breed..."
                value={searchBreedTerm}
                onChange={handleSearchChange}
            />
            <p>Results:</p>
            <div>{JSON.stringify(searchResults, null, 2)}</div>
        </div>
    );
};

DogLookup.defaultProps = {};
DogLookup.propTypes = {};

export default DogLookup;
