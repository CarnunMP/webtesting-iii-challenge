import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
    wrapper = rtl.render(<Dashboard />);
});

describe("Dashboard component", () => {
    it("can debug the output", () => {
        wrapper.debug;
    });
});