import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Controls from "./Controls";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
    wrapper = rtl.render(<Controls locked={false} closed={false} />);
});

describe("Controls component", () => {
    it("can debug the output", () => {
        wrapper.debug();
    });
    it("provides buttons to toggle the `closed` and `locked` states", () => {
        expect(wrapper.queryByTestId(/lockButton/)).toBeInTheDocument();
        expect(wrapper.queryByTestId(/closeButton/)).toBeInTheDocument();
    });
    it("buttons' text changes to reflect the state the door will be in if clicked", () => {
        expect(wrapper.queryByText(/close gate/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/lock gate/i)).toBeInTheDocument();
        
        // This test seems to be broken from here on down, and I'm not sure why...
            // rtl.fireEvent.click(wrapper.queryByTestId(/closeButton/));
            // expect(wrapper.queryByText(/close gate/i)).not.toBeInTheDocument();
            // expect(wrapper.queryByText(/open gate/i)).toBeInTheDocument();

            // rtl.fireEvent.click(wrapper.queryByTestId(/lockButton/));
            // expect(wrapper.queryByText(/lock gate/i)).not.toBeInTheDocument();
            // expect(wrapper.queryByText(/unlock gate/i)).toBeInTheDocument();

        // Figured it out! The version of the comp rendered doesn't have access to the toggle functions... -__-
        // Moved this test to Dashboard instead.
    });
    it("the closed toggle button is disabled if the gate is locked", () => {
        rtl.cleanup();
        const lockedGate = rtl.render(<Controls locked={true} />);
        expect(lockedGate.queryByTestId(/closeButton/)).toHaveAttribute("disabled");
    });
    it("the locked toggle button is disabled if the gate is open", () => {
        expect(wrapper.queryByTestId(/lockButton/)).toHaveAttribute("disabled");
    });
});