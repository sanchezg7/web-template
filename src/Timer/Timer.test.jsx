import React from "react";
import { render } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer", () => {
    describe("Iteration Window", () => {
        test("Given a window, When render, Then user is prompted to start is yielded", () => {
            const { getByText } = render(<Timer seconds={2} />);
            getByText("start");
        });
        test("Given a 2 second window, When render, Then duration is yielded", () => {
           const { getByTestId } = render(<Timer seconds={2} />);
           const secsLeft = getByTestId("seconds-left");
           const attr = secsLeft.getAttribute("style");
           expect(attr).toStrictEqual("--value: 2;")
        });
    });
});
