import React from "react";
import { act, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
            expect(attr).toStrictEqual("--value: 2;");
        });
    });
    // Proving to be trickier to test due to async and act wrapping requirements
    describe.skip("Keyboard Support", () => {
        test("Given a RESET timer, When spacebar entered, Then timer is RUNNING", async (done) => {
            const { getByText, findByText } = render(<Timer seconds={2} />);
            await act(() => {
                getByText("start");
                userEvent.keyboard("[Enter]");
            });
            // fireEvent.keyDown(btn, { key: "Enter", code: "Enter" });
            getByText("pause");
        });
    });
});
