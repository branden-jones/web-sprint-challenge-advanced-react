import AppFunctional from "./AppFunctional";
import AppClass from "./AppClass";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

test(`does widget render`, () => {
  render(<AppFunctional />);
});

test(`AppClass mounts without failing`, () => {
  render(<AppClass />);
});

// test(`buttons increase steps`, async () => {
//   render(<AppFunctional />);

//   const upButton = screen.getByText(/up/i);
//   fireEvent.click(upButton);
//   //   const rightButton = screen.getByText(/right/i);
//   //   fireEvent.click(rightButton);

//   const stepsReadout = screen.queryByText(/you moved/i);

//   expect(stepsReadout).toHaveTextContent(/you moved 1 time/i);
// });

// test(`buttons stop if trying to go through wall`, () => {
//   render(<AppClass />);
//   render(<AppFunctional />);

//   const downButton = screen.getByText(/down/i);
//   fireEvent.click(downButton);
//   const leftButton = screen.getByText(/left/i);
//   fireEvent.click(leftButton);

// })
