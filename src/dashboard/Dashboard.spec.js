import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
    wrapper = rtl.render(<Dashboard />);
});

describe("Gate", () => {
    it("defaults to 'unlocked' and 'open'", () => {
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
    });
    it("cannot be closed or opened if it is locked", () => {
        rtl.fireEvent.click(wrapper.queryByText(/close gate/i));
        rtl.fireEvent.click(wrapper.queryByText(/lock gate/i));
        
        rtl.fireEvent.click(wrapper.queryByText(/open gate/i));
        expect(wrapper.queryByText(/locked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/closed/i)).toBeInTheDocument();
    });
});

describe("Dashboard component", () => {
    it("can debug the output", () => {
        wrapper.debug();
    });
});