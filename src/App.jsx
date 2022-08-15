import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Timer from "./Timer";


const NotFound = () => {
    return <div>Sorry, nothing here.</div>;
};

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Timer />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
