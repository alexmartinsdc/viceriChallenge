import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import TaskCreation from "../components/tasks/TaskCreation";

export default function (props) {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskCreation />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}