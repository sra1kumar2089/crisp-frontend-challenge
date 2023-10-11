import React from "react";
import { Routes, Route } from "react-router-dom";
import Tasks from "./Tasks";
import Matrix from "./Matrix";

export default function NavPage() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/matrix" element={<Matrix />} />
            </Routes>
        </React.Fragment>
    );
}