import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./Display";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
    wrapper = rtl.render(<Display />);
});

describe("Display component", () => {
    it("can debug the output", () => {
        wrapper.debug();
    });
    it("displays if gate is open/closed and if it is locked/unlocked", () => {
        expect(wrapper.queryByTestId(/display/)).toBeInTheDocument();
    });
    it("displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise", () => {
        expect(wrapper.queryByText(/Open/)).toBeInTheDocument();
        
        rtl.cleanup();
        const closedDisplay = rtl.render(<Display closed={true} />);
        expect(closedDisplay.queryByText(/Closed/)).toBeInTheDocument();
    });
    it("displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise", () => {
        expect(wrapper.queryByText(/Unlocked/)).toBeInTheDocument();
        
        rtl.cleanup();
        const lockedDisplay = rtl.render(<Display locked={true} />);
        expect(lockedDisplay.queryByText(/Locked/)).toBeInTheDocument();
    });
    it("when `locked` or `closed` use the `red-led` class", () => {
        rtl.cleanup();
        const lockedDisplay = rtl.render(<Display locked={true} />);
        expect(lockedDisplay.queryByTestId(/red-led/)).toBeInTheDocument();

        rtl.cleanup();
        const closedDisplay = rtl.render(<Display closed={true} />);
        expect(closedDisplay.queryByTestId(/red-led/)).toBeInTheDocument();
    });
    it("when `unlocked` or `open` use the `green-led` class", () => {
        rtl.cleanup();
        const unlockedDisplay = rtl.render(<Display locked={false} closed={true} />);
        expect(unlockedDisplay.queryByTestId(/green-led/)).toBeInTheDocument();

        rtl.cleanup();
        const openDisplay = rtl.render(<Display closed={false} locked={true} />);
        expect(openDisplay.queryByTestId(/green-led/)).toBeInTheDocument();
    });
});