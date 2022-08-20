import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Timer from "./Timer/Timer";

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
