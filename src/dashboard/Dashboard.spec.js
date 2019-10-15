import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import { wrap } from "module";

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
    it("shows the controls and display", () => {
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/close gate/i)).toBeInTheDocument();
    });
});

describe("Controls component", () => {
    it("buttons' text changes to reflect the state the door will be in if clicked", () => {
        expect(wrapper.queryByText(/Close Gate/)).toBeInTheDocument();
        expect(wrapper.queryByText(/Lock Gate/)).toBeInTheDocument();
        
        rtl.fireEvent.click(wrapper.queryByText(/Close Gate/));
        expect(wrapper.queryByText(/Close Gate/)).not.toBeInTheDocument();
        expect(wrapper.queryByText(/Open Gate/)).toBeInTheDocument();

        rtl.fireEvent.click(wrapper.queryByText(/Lock Gate/));
        expect(wrapper.queryByText(/Lock Gate/)).not.toBeInTheDocument();
        expect(wrapper.queryByText(/Unlock Gate/)).toBeInTheDocument();
    });
});