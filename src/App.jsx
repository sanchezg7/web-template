import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Pomodoro from "./Pomodoro/Pomodoro";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Pomodoro />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
