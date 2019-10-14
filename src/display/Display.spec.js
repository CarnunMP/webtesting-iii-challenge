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
});