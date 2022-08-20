import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Timer from "./Timer/Timer";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Timer />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
